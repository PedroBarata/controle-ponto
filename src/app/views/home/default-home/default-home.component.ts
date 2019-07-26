import { Component, OnInit } from "@angular/core";
import { NotificationUI } from "src/app/model/notification.ui";
import { Status, Ponto } from "src/app/model/ponto.model";
import { ActionService } from "src/app/services/action.service";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormControl } from "@angular/forms";

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
  public form: FormGroup;
  constructor(
    private actionService: ActionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const now = new Date();
    this.form = new FormGroup({
      date: new FormControl({
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate()
      }),
      entrada: new FormControl(null),
      saida: new FormControl(null),
      inicioAlmoco: new FormControl(null),
      voltaAlmoco: new FormControl(null)
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
    const formattedDate = this.formatDateInputToDate(
      this.form.get("date").value.year,
      this.form.get("date").value.month,
      this.form.get("date").value.day
    );
    const ponto: Ponto = {
      id: null,
      userId: this.userId,
      entrada: this.formatTimeInputsToDate(
        this.form.get("entrada").value.hour,
        this.form.get("entrada").value.minute,
        formattedDate
      ),
      saida: this.formatTimeInputsToDate(
        this.form.get("saida").value.hour,
        this.form.get("saida").value.minute,
        formattedDate
      ),
      mes: formattedDate.getMonth(),
      status: Status.Stopped
    };
    if (
      this.form.get("inicioAlmoco").value &&
      this.form.get("voltaAlmoco").value
    ) {
      ponto.inicioAlmoco = this.formatTimeInputsToDate(
        this.form.get("inicioAlmoco").value.hour,
        this.form.get("inicioAlmoco").value.minute,
        formattedDate
      );
      ponto.voltaAlmoco = this.formatTimeInputsToDate(
        this.form.get("voltaAlmoco").value.hour,
        this.form.get("voltaAlmoco").value.minute,
        formattedDate
      );
    }
    console.log(ponto);
    this.actionService.onStartDay(ponto, this.token).subscribe((ponto) => {

    })
  }

  formatDateInputToDate(year: number, month: number, day: number) {
    const date = new Date();
    date.setDate(day);
    date.setFullYear(year);
    date.setMonth(month);
    return date;
  }

  formatTimeInputsToDate(hour: number, minute: number, date: Date) {
    date.setHours(hour);
    date.setMinutes(minute);
    return date.toISOString();
  }
}
