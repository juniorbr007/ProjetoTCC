import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApiService } from 'app/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { Edital } from 'app/models/edital';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AlertService } from 'app/services/alert/alert.service';

@Component({
  selector: 'add-edital',
  templateUrl: './add-edital.component.html',
  styleUrls: ['./add-edital.component.css']
})
export class AddEditalComponent implements OnInit {

  editorStyle = {
    height: '200px',
    backgroundColor: '#ffffff'
  }

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
  
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['link']                         // link and image, video
    ]
  };

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
  
  tipo: string[] = ['Bolsa', 'Auxilio', 'Extensão']
  constructor(
    private alertServ: AlertService,
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
          return this.alertServ.alertSuccess('Edital publicado com sucesso!.');
        });
    } else {
      console.log('Algo Errado!');
    }
  }
}
