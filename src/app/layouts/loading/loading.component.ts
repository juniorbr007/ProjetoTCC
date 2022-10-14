import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  moduleId: module.id,
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {

  @Input() message = '';

  constructor() { }

  ngOnInit() {
  }
}