import { Subject, takeUntil, } from 'rxjs';
import { AlertService } from 'app/services/alert/alert.service';
import { ApiService } from 'app/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { Edital } from 'app/models/edital';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  filterTerm!: string;
  userRecords = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz',
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz',
    },
  ];


  destroyed$ = new Subject<void>();
  showSpinner: boolean = false;
  userProjects: any = [];
  dataEdital: Edital = {
    uid: '',
    tipos: '',
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

  dashEditals: any = [];
  userProfile: User;
  mode = 'list';

  constructor(
    private alertServ: AlertService,
    private apiServ: ApiService,
    private router: Router
  ) {
    this.userProfile = JSON.parse(localStorage.getItem('userProfile'));
    console.log('userProfile: ', this.userProfile.uid);
    this.getEditals();
    this.getProjects();
  }

  ngOnInit() {
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
          if (resp.length > 0) {
            let arrayEdit = resp;
            arrayEdit.forEach((edital, i) => {
              if (!edital) return;
              this.dashEditals.push(edital);
            });
          }
          this.showSpinner = false;
        },
        error: (error) => { console.error('Erro: ', error); this.showSpinner = false; },
        complete: () => { this.showSpinner = false }
      })
  }

  goToEdital(edit) {
    this.dataEdital = edit;
  }

  closeEdit() {
    this.mode = 'list';
  }

  getProjects() {
    this.showSpinner = true;
    this.apiServ.getProjects(this.userProfile.uid)
      .pipe(
        // take(1),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (resp) => {
          if (resp && this.userProjects.length > 0) {
            resp.projects.forEach((editalID, i) => {
              if (!editalID) return;
              this.userProjects.push(editalID);
            });
          }
          if (resp && this.userProjects.length <= 0) {
            this.userProjects = resp.projects;
          }
          this.showSpinner = false;
        },
        error: (error) => { console.error('Erro: ', error); this.showSpinner = false; },
        complete: () => { this.showSpinner = false }
      })
  }

  subscribeProjects(edit) {
    this.showSpinner = true;
    if (this.userProjects.some(elem => elem === edit['uid'])) {
      this.router.navigate(['/projetos']);
      return this.alertServ.alertWarning('Você já adicionou este projeto antes, ele se encontra em meus projetos.');

      // console.log('Duplicado: ', edit['uid']);
    } else {
      if (!edit.uid) return;
      this.userProjects.push(edit.uid);
      this.alertServ.alertSuccess('Projeto Adicionado com sucesso ao seus projetos.');

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
    }).catch((error) => { this.showSpinner = false; console.log('Erro: ', error) });
  }

  ngOnDestroy() {
    delete (this.dashEditals);
    this.destroyed$.next();
    delete (this.userProjects);
    console.log('OnDestroy: 🏃🏾‍♂️​');
  }
}
