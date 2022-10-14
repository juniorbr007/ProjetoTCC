import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading2',
  moduleId: module.id,
  templateUrl: './loading2.component.html'
})
export class Loading2Component implements OnInit {

  @Input() messages = '';

  constructor() { }

  ngOnInit() {
  }
}