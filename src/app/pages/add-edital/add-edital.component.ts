import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApiService } from 'app/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { Edital } from 'app/models/edital';
import { Router } from '@angular/router';

@Component({
  selector: 'add-edital',
  templateUrl: './add-edital.component.html',
  styleUrls: ['./add-edital.component.css']
})
export class AddEditalComponent implements OnInit {

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

  constructor(
    private fireDataBase: AngularFirestore,
    private apiServ: ApiService,
    private router: Router
  ){
    this.dataEdital.uid = this.fireDataBase.createId();
  }

  ngOnInit(): void {
  }

  saveEdital(dataEdital: Edital) {
    if (dataEdital) {
      this.apiServ.addEditals(dataEdital)
        .then(res => {
          delete(this.dataEdital);
          this.router.navigate(['/dashboard']);
        });
    } else {
      console.log('Algo Errado!');
    }
  }
}
