import { Component, OnInit } from "@angular/core";
import { NotificationUI } from "src/app/model/notification.ui";
import { Status, Ponto } from "src/app/model/ponto.model";
import { ActionService } from "src/app/services/action.service";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: "app-default-home",
  templateUrl: "./default-home.component.html",
  styleUrls: ["./default-home.component.scss"]
})
export class DefaultHomeComponent implements OnInit {
  public notification: NotificationUI;
  public ponto: Ponto;
  private userId: string;
  private token: string;
  public form: FormGroup
  constructor(
    private actionService: ActionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const now = new Date();
    this.form = new FormGroup({
      date: new FormControl({year: now.getFullYear(), month: now.getMonth()+1, day: now.getDate()}),
      inicioTime: new FormControl(null),
      fimTime: new FormControl(null),
      inicioAlmocoTime: new FormControl(null),
      fimAlmocoTime: new FormControl(null)
    });

    this.userId = this.authService.getUserId();
    this.token = this.authService.getToken();
    this.checkInitializedDay();
  }

  checkInitializedDay() {
    const inicioDia = new Date();
    inicioDia.setHours(0, 0);
    inicioDia.toISOString();

    const fimDia = new Date();
    fimDia.setHours(23, 59);
    fimDia.toISOString();

    const data: Ponto = {
      id: null,
      entrada: inicioDia.toISOString(),
      saida: fimDia.toISOString(),
      userId: this.userId,
      status: Status.Started,
      mes: inicioDia.getMonth()
    };
    this.actionService.getDay(data, this.token).subscribe(response => {
      const val: Ponto[] = Object.values(response);
        console.log(val);

       this.ponto = { ...val[0] };
       console.log(this.ponto);

    });
  }

  onSubmitAction(status: Status) {
    const now = new Date().toISOString();
    if (status === Status.Started) {
      this.start(now);
    } else if (status === Status.Paused) {
      this.pause(now);
    } else if (status === Status.Returned) {
      this.return(now);
    } else {
      this.stop(now);
    }
    this.actionService.sendInfo(status);
  }

  start(now: string) {

    const newPonto: Ponto = {
      id: null,
      entrada: now,
      userId: this.userId,
      status: Status.Started,
      mes: new Date(now).getMonth()
    };

    this.actionService.onStartDay(newPonto, this.token).subscribe(response => {
      const val = JSON.parse(JSON.stringify(response));
      console.log("[STARTED]", val);
      this.ponto = { ...newPonto, id: val.name };
    });
  }

  pause(now: string) {
    const newPonto: Ponto = {
      ...this.ponto,
      inicioAlmoco: now,
      status: Status.Paused
    };
    this.actionService.updateDay(newPonto, this.token).subscribe(response => {
      const val: Ponto = JSON.parse(JSON.stringify(response));
      console.log("[PAUSED]", val);
      this.ponto = val;
    });
  }

  return(now: string) {
    const newPonto: Ponto = {
      ...this.ponto,
      voltaAlmoco: now,
      status: Status.Returned
    };

    this.actionService.updateDay(newPonto, this.token).subscribe(response => {
      const val: Ponto = JSON.parse(JSON.stringify(response));
      console.log("[RETURNED]", val);
      this.ponto = val;
    });
  }

  stop(now: string) {
    const newPonto: Ponto = {
      ...this.ponto,
      saida: now,
      status: Status.Stopped
    };

    this.actionService.updateDay(newPonto, this.token).subscribe(response => {
      const val: Ponto = JSON.parse(JSON.stringify(response));
      console.log("[STOPED]", val);
      this.ponto = val;
    });
  }

  onSubmitForm() {
    console.log(this.form.value);
  }
}
