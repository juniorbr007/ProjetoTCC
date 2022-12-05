import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
// import 'sweetalert2/src/sweetalert2.scss';
import { Router } from '@angular/router';
import { NgZone } from "@angular/core";
import Swal from 'sweetalert2';
import { take } from "rxjs/operators";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  showSpinner: boolean = false;
  signinForm: UntypedFormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.min(3), Validators.max(8)]]
  });

  constructor(
    public authService: AuthService,
    public fb: UntypedFormBuilder,
    public router: Router,
    public ngZone: NgZone 
  ){
  }

  ngOnInit(){ 
  }

  async registerUser(name, email, password) {
    this.showSpinner = true;
      await this.authService.register(email, password)
      .then((res)=>{
        if(res.user['uid']){
          this.authService.createProfile(name, res.user.email, res.user.uid);
          this.ngZone.run(() => {
            this.authLogin(email, password);
            Swal.fire({
              icon: 'success',
              title: 'Muito bem!',
              text: 'Cadastro realizado com sucesso! Aproveite as oportunidades!'
            });
          });
        }else{
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Houve algum engano. Tente novamente mais tarde!'
          });
          console.log('Erro: ', 'Algum engano.');
        }
        this.showSpinner = false;
      }).catch((err)=>{
        this.showSpinner = false;
        Swal.fire({
          icon: 'error',
          title: 'Algo errado!',
          text: 'Informe os seus dados.'
        });
        console.log('Algo errado: ', err);
      });
  }

  async authLogin(userEmail, userPsw) {
    this.showSpinner = true;
    await this.authService.login(userEmail, userPsw)
    .then(res => {
      if (res.user) {
        localStorage.setItem('userUID', res.user.uid);
        localStorage.setItem('userEmail', res.user.email);
        this.authService.getUserProfile(res.user.uid)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            this.showSpinner = false;
            let userRes = res.payload.data();
            localStorage.setItem('userProfile', JSON.stringify(userRes));
            if(userRes['bloq']===false){
              this.router.navigateByUrl('/admin-layout/login');
            }else{
              Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Acesso negado! Por favor, fale com os Administradores.'
              });
              return this.authService.logout();
            }
          }, error: (error) => this.showSpinner = false,
          complete: () => this.showSpinner = false
        });         
      }
    }).catch((err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Informe os seus dados.'
      });
      this.router.navigate(['/login']);
    });
  }

  doLogin(){
    this.showSpinner = false;
    this.router.navigate(['/login']);
  }
}