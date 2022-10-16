import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApiService } from 'app/services/api/api.service';
import { PrintService } from 'app/print/print.service';
import { Component, OnInit } from '@angular/core';
import { map, finalize } from 'rxjs/operators';
import { File } from './../../models/file';
import { User } from 'app/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.css']
})
export class ArquivosComponent implements OnInit {

  uploadProgress: Observable<number>;
  ref: AngularFireStorageReference;
  showSpinner: boolean = false;
  task: AngularFireUploadTask;
  userProfile: User;
  identity: any;
  cpf: any;
  proof: any;
  history: any;
  letter: any;
  files: File;
  
  constructor(
    private afStorage: AngularFireStorage,
    private printService: PrintService,
    private apiServ: ApiService
  ){
    this.userProfile = JSON.parse(localStorage.getItem('userProfile'));
    this.getFiles();
  }

  ngOnInit(): void {
   
  }

  getFiles() {
    this.showSpinner = true;
    this.apiServ.listFiles(this.userProfile['uid'])
      .subscribe({
        next: (resp) => {
          if(resp && resp['uid']){
            this.files = {
              uid: resp['uid'],
              identity: resp['identity'],
              cpf: resp['pdf'],
              proof: resp['proof'],
              history: resp['history'],
              letter: resp['letter'],
              createdAt: resp['createdAt'],
              updatedAt: Date.now()
            };
          } else {
            this.files = {
              uid: this.userProfile['uid'],
              identity: 'Sem imagem',
              cpf: 'Sem imagem',
              proof: 'Sem imagem',
              history: 'Sem imagem',
              letter: 'Sem imagem',
              createdAt: Date.now(),
              updatedAt: Date.now()
            };
          }
          this.showSpinner = false;
        },
        error: (error) => { console.error('Erro: ', error); this.showSpinner = false;},
        complete: () => { console.log('complete ', this.files); this.showSpinner = false }
      });
  }

  // function to upload file
  upload = (event, document) => {
    console.log('Upload ', this.userProfile['uid']);
    // create a reference to the storage bucket location
    this.ref = this.afStorage.ref(`/${this.userProfile['uid']}/${document}`);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    this.task = this.ref.put(event.target.files[0]);
    
    // AngularFireUploadTask provides observable
    // to get uploadProgress value
    // this.uploadProgress = this.task.snapshotChanges()
    // .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
    
    // observe upload progress
    this.uploadProgress = this.task.percentageChanges();
    // get notified when the download URL is available
    this.task.snapshotChanges().pipe(
      finalize(async () => {
        this.ref.getDownloadURL().subscribe((photoUrl) => {
          if(document==='identity'){
            this.files['identity'] = photoUrl;
          };
          if(document==='cpf'){
            this.files['cpf'] = photoUrl;
          };
          if(document==='proof'){
            this.files['proof'] = photoUrl;
          }
          if(document==='history'){
            this.files['history'] = photoUrl;
          };
          if(document==='letter'){
            this.files['letter'] = photoUrl;
          };        
          this.saveUpdateFile(this.files);
        });
      })      
    ).subscribe();
  }

  saveUpdateFile(dataFiles) {
    this.showSpinner = true;
    this.apiServ.saveUdpadeFiles(dataFiles)
    .then((resp)=> {
      // console.info('Files Okay');
      this.showSpinner = false;
    }).catch((error)=>{
      // console.info('Files resp: ', error);
      this.showSpinner = false;
    })
  }

  printAsPDF() {
    let pdfName = `Ajudai - ${this.userProfile['name']}`;
    this.apiServ.setPrintName(pdfName);
    // console.info('Print Files: ', pdfName);
    this.printService.popupPrint('.pdfContainer');
  }
}
