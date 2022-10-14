import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { UserService } from 'app/services/user/user.service';
import { ApiService } from 'app/services/api/api.service';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/user';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

    ref: AngularFireStorageReference;
    showSpinner: boolean = false;
    task: AngularFireUploadTask;
    userValue: boolean = false;
    users: any = [];
    userUID: any;
    total: any;
    user: User = {
        uid: 'uid',
        name: 'Nome',
        bloq: false,
        email: 'Email',
        photoURL: 'photoURL',
        address: 'Endereço',
        admin: false,
        obs: 'Eu também estou curtindo a plataforma!',
        createdAt: 0,
        updatedAt: 0
    };

    constructor(
        private afStorage: AngularFireStorage,
        private userService: UserService,
        public apiService: ApiService,
        public router: Router
    ){
    }

    ngOnInit() {
        this.getUserUID();
    }

    getUserUID() {
        this.userUID = localStorage.getItem('userUID');
        if(this.userUID) {
            this.getUser(this.userUID);
        }
    }

    getUser(uid) {
        this.showSpinner = true;
        this.userService.getUserById(uid)
            .then((res) => {
                let dataUser = res.data();
                if (res) {
                    this.user = {
                        uid: dataUser['uid'],
                        name: dataUser['name'],
                        bloq: dataUser['bloq'],
                        email: dataUser['email'],
                        photoURL: dataUser['photoURL'],
                        address: dataUser['address'],
                        admin: dataUser['admin'],
                        obs: dataUser['obs'],
                        createdAt: dataUser['createdAt'],
                        updatedAt: dataUser['updatedAt']
                    }
                    this.userValue = true;
                }
                console.log('[User]: ', dataUser);
                this.showSpinner = false;
            },(error)=> this.showSpinner = false);        
    }

    updateUserData(dataUser){
        this.showSpinner = true;
        let userID = dataUser.uid;
        const user = {
            uid: dataUser['uid'],
            name: dataUser['name'],
            bloq: dataUser['bloq'],
            email: dataUser['email'],
            photoURL: dataUser['photoURL'] || 'Sem foto...',
            address: dataUser['address'] || 'Adicione seu endereço!',
            admin: dataUser['admin'],
            obs: dataUser['obs'],
            createdAt: dataUser['createdAt'],
            updatedAt: Date.now()
        }
        console.log('updateUserData: ', user);
        this.apiService.updateDataUser(userID, user)
        .then((res)=>{
            this.showSpinner = false;
        }).catch((error)=>{
            this.showSpinner = false;
        });
    }

    // function to upload file
    addUpdateImage = (event) => {
        console.log('Upload ', this.userUID);
        // create a reference to the storage bucket location
        this.ref = this.afStorage.ref(`/${this.userUID}/`+'imageProfile');
        // the put method creates an AngularFireUploadTask
        // and kicks off the upload
        this.task = this.ref.put(event.target.files[0]);

        // AngularFireUploadTask provides observable
        // to get uploadProgress value
        // this.uploadProgress = this.task.snapshotChanges()
        // .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));

        // observe upload progress
        // this.uploadProgress = this.task.percentageChanges();
        // get notified when the download URL is available
        this.task.snapshotChanges().pipe(
            finalize(async () => {
                this.ref.getDownloadURL().subscribe((photoUrl) => {
                    // this.saveUpdateFile(photoUrl);
                    this.user.photoURL = photoUrl;
                    this.updateUserData(this.user);
                });
            })
        ).subscribe();
    }
}
