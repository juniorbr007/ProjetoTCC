import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alertSuccess(msg) {
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: msg
    });
  }

  alertWarning(msg) {
    Swal.fire({
      icon: 'warning',
      title: 'Alerta!',
      text: msg
    });
  }

  alertError(msg) {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: msg
    });
  }
}
