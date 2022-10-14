import printPageHTML from '!!raw-loader!./print-page.html';
import { ApiService } from 'app/services/api/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  
  constructor(
    private apiServ: ApiService
  ){    
  }

  popupPrint(selector: string) {
    const pdfName = this.apiServ.getPrintName();
    const printContents = document.querySelector(selector).innerHTML;        
    const width = 1080;
    const height = 1920;
    const top = window.innerHeight / 2 - height / 2;
    const left = window.innerWidth / 2 - width / 2;
    const windowFeatures = `modal=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`;
    const popupWin = window.open('', '_blank', windowFeatures);
    popupWin.document.open();
    popupWin.document.write(printPageHTML.replace('{{printContents}}', printContents));
    popupWin.document.title = pdfName;
  }

}