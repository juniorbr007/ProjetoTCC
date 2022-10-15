import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
import { AlertService } from 'app/services/alert/alert.service';
import { ApiService } from 'app/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { Projects } from 'app/models/projects';
import { first, take } from 'rxjs/operators';
import { Edital } from 'app/models/edital';
import { Router } from '@angular/router';
import { User } from 'app/models/user';

@Component({
  selector: 'projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {

  destroyed$ = new Subject<void>();
  showSpinner:boolean = false;
  editals: any = [];
  userProfile: User;
  userProjs: Projects;
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
    valor: '',
    createdAt: 0,
    updatedAt: 0,
  };
  mode = 'list';

  constructor(
    private alertServ: AlertService,
    private apiServ: ApiService,
    private router: Router
  ){
    this.userProfile = JSON.parse(localStorage.getItem('userProfile'));
    this.getProjects();
  }

  ngOnInit(): void {    
  }

  getProjects() {
    this.showSpinner = true;
    this.apiServ.getProjects(this.userProfile.uid)
    .pipe(
      // take(1),
      takeUntil(this.destroyed$)
    )
    .subscribe({
      next: (idProjs) => {
        if(!idProjs || !idProjs.projects) return;
        this.userProjs = idProjs;
        console.log('userProjs: ', this.userProjs.projects);
        this.userProjs.projects.forEach((projID, i) => {
          if (projID !== undefined) {
            this.apiServ.getEditals(projID)
            .pipe(
              take(1),
              // takeUntil(this.destroyed$)
            )
            .subscribe({
              next: (resp) => {
                if(!resp)return;
                if (resp) {
                  this.editals.push(resp);
                }
                this.showSpinner = false;
              }, error: (error) => { console.error('Erro: ', error); this.showSpinner = false;},
              complete: () => { this.showSpinner = false }
            })
          }
        })
      },
      error: (error) => { console.error('Erro: ', error); this.showSpinner = false;},
      complete: () => { this.showSpinner = false }
    });
  }

  goToEdital(edit) {
    this.dataEdital = edit;
  }

  closeEdit() {
    this.mode = 'list';
  }

  delete(uid: string) {
    this.showSpinner = true;
    console.log('Delete: ', uid);
    let index = this.userProjs.projects.indexOf(uid);
    this.userProjs.projects.splice(index, 1);  
    this.updateProjects(this.userProfile.uid, this.userProjs);
  }

  async updateProjects(userUID: string, userProjs: Projects) {
    console.log('Final: ', this.userProjs);
    await this.apiServ.updateProjects(userUID, userProjs).then((resp) => {
      this.alertServ.alertSuccess('Deletado com sucesso!');
      this.userProjs.projects = [];
      this.editals = [];
      this.closeEdit();
      this.showSpinner = false;
      this.router.navigate(['/dashboard']);
    }).catch((error)=> {this.showSpinner = false; console.log('Erro: ', error)});
  }

  ngOnDestroy() {
    delete(this.editals);
    delete(this.userProjs);
    this.destroyed$.next();
    console.log('OnDestroy: 🏃🏾‍♂️​');
  }
}
