import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { AlertService } from 'app/services/alert/alert.service';
import { ApiService } from 'app/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { first, take } from 'rxjs/operators';
import { Edital } from 'app/models/edital';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{

  destroyed$ = new Subject<void>();
  showSpinner: boolean = false;
  userProjects: any = [];
  dataEdital: Edital = {
    uid: '',
    title: '',
    descr: '',
    obs: '',
    requirements: '',
    calendarfirst: '',
    calendarend: '',
    link: '',
    vagas: '',
    createdAt: 0,
    updatedAt: 0,
  };
  dashEditals: any = [];
  userProfile: User;
  mode = 'list';

  constructor(
    private alertServ: AlertService,
    private apiServ: ApiService,
    private router: Router
  ){
    this.userProfile = JSON.parse(localStorage.getItem('userProfile'));
    console.log('userProfile: ', this.userProfile.uid);
    this.getEditals();
    this.getProjects();
  }

  ngOnInit(){
  }

  getEditals() {
    this.showSpinner = true;
    this.apiServ.listEditals()
    .pipe(
      // take(1),
      takeUntil(this.destroyed$)
    )
    .subscribe({
      next: (resp) => {
        if(resp.length>0){
          let arrayEdit = resp;
          arrayEdit.forEach((edital, i) => {
            if(!edital)return;
            this.dashEditals.push(edital);
          });
        }
        this.showSpinner = false;
      },
      error: (error) => { console.error('Erro: ', error); this.showSpinner = false;},
      complete: () => { this.showSpinner = false }
    })
  }

  goToEdital(edit) {
    this.dataEdital = edit;
  }

  closeEdit() {
    this.mode = 'list';
  }

  getProjects(){
    this.showSpinner = true;
    this.apiServ.getProjects(this.userProfile.uid)
    .pipe(
      // take(1),
      takeUntil(this.destroyed$)
    )
    .subscribe({
      next: (resp) => {
        if(resp && this.userProjects.length>0){
          resp.projects.forEach((editalID, i) => {
            if(!editalID)return;
            this.userProjects.push(editalID);
          });
        }
        if(resp && this.userProjects.length<=0){
          this.userProjects = resp.projects;
        }
        this.showSpinner = false;
      },
      error: (error) => { console.error('Erro: ', error); this.showSpinner = false;},
      complete: () => { this.showSpinner = false }
    })
  }

  subscribeProjects(edit) {
    this.showSpinner = true;
    if (this.userProjects.some(elem => elem === edit['uid'])) {
      return this.alertServ.alertWarning('Projeto já adicionado antes.');
      // console.log('Duplicado: ', edit['uid']);
    } else {
      if(!edit.uid) return;
      this.userProjects.push(edit.uid);
    }
    let dataProj = {
      createdAt: edit.createdAt,
      projects: this.userProjects,
      updatedAt: edit.updatedAt,
    }
    this.sendSubscription(this.userProfile.uid, dataProj);
  }

  async sendSubscription(uid, dataProj) {
    return await this.apiServ.subscribeProjects(uid, dataProj).then((resp) => {
      this.showSpinner = false;
      this.router.navigate(['/projetos']);
      console.log('125 - Subscribed Okay! ', this.userProfile.uid);
    }).catch((error)=> {this.showSpinner = false; console.log('Erro: ', error)});
  }

  ngOnDestroy() {
    delete(this.dashEditals);
    this.destroyed$.next();
    delete(this.userProjects);
    console.log('OnDestroy: 🏃🏾‍♂️​');
  }
}
