import { Component, OnInit } from "@angular/core";
import { NotificationUI } from "src/app/model/notification.ui";
import { Status, Ponto } from "src/app/model/ponto.model";
import { ActionService } from "src/app/services/action.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-default-home",
  templateUrl: "./default-home.component.html",
  styleUrls: ["./default-home.component.scss"]
})
export class DefaultHomeComponent implements OnInit {
  public notification: NotificationUI;
  public ponto: Ponto;
  private userId: string;

  constructor(
    private actionService: ActionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.checkInitializedDay();
  }

  checkInitializedDay() {
    const now = new Date().toISOString();
    const data: Ponto = {
      id: undefined,
      userId: this.userId,
      entrada: now,
      status: Status.Started,
      mes: new Date(now).getMonth()
    };
    this.actionService.getDay(data).subscribe(response => {
      const val: Ponto = JSON.parse(JSON.stringify(response));
      this.ponto = { ...val };
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

    this.actionService.onStartDay(newPonto).subscribe(response => {
      const val = JSON.parse(JSON.stringify(response));
      console.log("[STARTED]", val);
      this.ponto = {...newPonto, id: val.name};
    });
  }

  pause(now: string) {
    const newPonto: Ponto = {
      ...this.ponto,
      inicioAlmoco: now,
      status: Status.Paused
    };
    this.actionService.updateDay(newPonto).subscribe(response => {
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

     this.actionService.updateDay(newPonto).subscribe(response => {
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

    this.actionService.updateDay(newPonto).subscribe(response => {
      const val: Ponto = JSON.parse(JSON.stringify(response));
      console.log("[STOPED]", val);
      this.ponto = val;
    });
  }

}
