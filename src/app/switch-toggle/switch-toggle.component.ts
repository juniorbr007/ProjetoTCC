import { EventEmitter } from "@angular/core";
import { Component, Input, OnInit, Output } from "@angular/core";
import { User } from "app/models/user";

@Component({
  selector: "switch-toggle",
  templateUrl: "./switch-toggle.component.html",
  styleUrls: ["./switch-toggle.component.css"]
})
export class SwitchToggleComponent implements OnInit {

  @Input() id?: string;
  @Input() value?: User;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  // value: boolean;

  constructor() {}

  ngOnInit() {}

  setValue(value) {
    this.value = value;
    this.onChange.emit({ id: this.id, value: this.value });
  }
}
