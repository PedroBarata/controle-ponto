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
  public isDisabled = false;
  constructor() {}

  ngOnInit() {}

  @Input()
  set ponto(value: Ponto) {
    this._ponto = value;
    if (this._ponto) {
      if (
        this._ponto.status === Status.Started ||
        this._ponto.status === Status.Returned
      ) {
        this.isStarted = true;
      }
      if (!this._ponto.saida) {
        this.isDisabled = false;
      }
      if (this._ponto.status === Status.Stopped) {
        this.isDisabled = true;
      }
    }
  }

  get ponto() {
    return this._ponto;
  }

  onClickButton(status) {
    if (this.ponto && (status === Status.Started || status === Status.Returned)) {
      status = this.checkStartedOrReturned(this._ponto);
      this.isStarted = true;
    } else {
      this.isStarted = false;
    }
    this.action.emit(status);
  }

  checkStartedOrReturned(ponto: Ponto) {
    if (ponto.status === Status.Paused) {
      return Status.Returned;
    } else {
      return Status.Started;
    }
  }

  get status() {
    return Status;
  }
}
