import { UserService } from 'app/services/user/user.service';
import { AuthService } from 'app/services/auth/auth.service';
import { ApiService } from 'app/services/api/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/user';

@Component({
  selector: 'usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  showSpinner: boolean = false;
  users: any = [];
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
    private authService: AuthService,
    private userService: UserService,
    public apiService: ApiService,
    public router: Router
  ){    
  }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.showSpinner = true;
    this.userService.listUsers()
      .subscribe((res) => {
        if (res.length > 0) {
          this.users = res;
          this.total = this.users.length;
          localStorage.setItem('totalUsers', this.total);
        }
        // console.log('Users: ', res);
        this.showSpinner = false;
      }, (error) => this.showSpinner = false);
  }

  // Toggle function
  doAction(user: User): void {
    user.bloq===true? user.bloq=false: user.bloq=true;
    this.updateUserData(user);
  }

  updateUserData(dataUser) {
    const userData = {
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
    console.log('updateUserData: ', userData);
    this.apiService.updateDataUser(userData.uid, userData)
    .then((res)=>{
      this.showSpinner = false;
    }).catch((error)=>{
      this.showSpinner = false;
    });
  }
}
