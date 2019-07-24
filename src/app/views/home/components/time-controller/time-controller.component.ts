import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Status, Ponto } from "src/app/model/ponto.model";

@Component({
  selector: "app-time-controller",
  templateUrl: "./time-controller.component.html",
  styleUrls: ["./time-controller.component.scss"]
})
export class TimeControllerComponent implements OnInit {
  @Output() action = new EventEmitter<Status>();
  private _ponto: Ponto;
  public isStarted: boolean = false;
  constructor() {}

  ngOnInit() {}

  @Input()
  set ponto(value: Ponto) {
    this._ponto = value;

    if (
      this.ponto &&
      (this.ponto.status === Status.Started ||
        this.ponto.status === Status.Returned)
    ) {
      this.isStarted = true;
    }
  }

  get ponto() {
    return this._ponto;
  }

  onClickButton(status) {
    if (status === Status.Started || status === Status.Returned) {
      status = this.checkStartedOrReturned(this._ponto);
      this.isStarted = true;
    } else {
      this.isStarted = false;
    }
    this.action.emit(status);
  }

  checkStartedOrReturned(ponto: Ponto) {
    if(ponto.status === Status.Paused) {
      return Status.Returned;
    } else {
      return Status.Started;
    }
  }

  get status() {
    return Status;
  }
}
