import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
// import 'sweetalert2/src/sweetalert2.scss';
import { Router } from '@angular/router';
import { take } from "rxjs/operators";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  showSpinner: boolean = false;

  constructor(
    public authService: AuthService,
    private autServ: AuthService,
    public fb: UntypedFormBuilder,
    public router: Router
  ){
  }

  ngOnInit() { }

  async loginUser(userEmail, userPsw) {
    this.showSpinner = true;
    await this.authService.login(userEmail, userPsw)
    .then(res => {
      if (res) {
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
              this.router.navigateByUrl('/inicio');
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
      } else {
        this.showSpinner = false;
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Usuário não existe, ou dados incorretos.'
        });
        this.router.navigate(['/login']);
      }
    }).catch((err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Informe os seus dados.'
      });
      // console.log('Opss... algo errado.');
      this.router.navigate(['/login']);
    });
  }

  async recuperarSenha() {
    const { value: email } = await Swal.fire({
      title: 'Informe seu email',
      input: 'email',
      inputLabel: 'Seu email',
      inputPlaceholder: 'Digite seu email'
    })
    if (email) {
      Swal.fire(`Email informado: ${email}`).then(()=>{
        this.recoverPsw(email);
      });
    }
  } 

  recoverPsw(email) {
    this.authService.recoverPsw(email)
      .then(data => {
        Swal.fire({
          icon: 'success',
          title: 'Legal!',
          text: 'Um email foi enviando para você redefinir a sua senha.'
        });
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.log(` failed ${err}`);
        Swal.fire({
          icon: 'error',
          title: 'Oops... 😳​',
          text: 'Não há registros de usuários correspondentes a este e-mail.'
        });
      });
  }

  register(){
    this.router.navigate(['/cadastro']);
  }
}