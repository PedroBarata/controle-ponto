import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Actions } from "src/app/model/ponto.model";

@Component({
  selector: "app-time-controller",
  templateUrl: "./time-controller.component.html",
  styleUrls: ["./time-controller.component.scss"]
})
export class TimeControllerComponent implements OnInit {
  @Output() action = new EventEmitter<Actions>();
  public isStarted: boolean = false;
  constructor() {}

  ngOnInit() {}

  onClickButton(action) {
    if (action === Actions.Started) {
      this.isStarted = true;
    } else {
      this.isStarted = false;
    }
    this.action.emit(action);
  }

  get actions() {
    return Actions;
  }
}
