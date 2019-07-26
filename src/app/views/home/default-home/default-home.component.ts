import { Component, OnInit } from "@angular/core";
import { Status, Ponto } from "src/app/model/ponto.model";
import { ActionService } from "src/app/services/action.service";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UtilsService } from "src/app/services/utils.service";
import { TranslateService } from "@ngx-translate/core";
import { TypeNotifcation } from "src/app/model/notification.ui";

@Component({
  selector: "app-default-home",
  templateUrl: "./default-home.component.html",
  styleUrls: ["./default-home.component.scss"]
})
export class DefaultHomeComponent implements OnInit {
  public ponto: Ponto;
  private userId: string;
  private token: string;
  public form: FormGroup;
  public isLoading = false;
  constructor(
    private actionService: ActionService,
    private authService: AuthService,
    private utilsService: UtilsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    const now = new Date();
    this.form = new FormGroup({
      date: new FormControl(
        {
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          day: now.getDate()
        },
        [Validators.required]
      ),
      entrada: new FormControl(null, [Validators.required]),
      saida: new FormControl(null, [Validators.required]),
      inicioAlmoco: new FormControl(null),
      voltaAlmoco: new FormControl(null)
    });

    this.userId = this.authService.getUserId();
    this.token = this.authService.getToken();
    this.checkInitializedDay();
  }

  checkInitializedDay() {
    this.actionService.getDay(this.userId, this.token).subscribe(response => {
      const val: Ponto[] = Object.values(response);
      this.ponto = val.find((ponto: Ponto) => {
        const entradaDate = new Date(ponto.entrada);
        if (this.checkDate(entradaDate, new Date())) {
          return true;
        }
      });
    });
  }

  checkDate(date1: Date, date2: Date) {
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    ) {
      return true;
    } else {
      return false;
    }
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
      //console.log("[STARTED]", val);
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
      //console.log("[PAUSED]", val);
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
      //console.log("[RETURNED]", val);
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
      //console.log("[STOPED]", val);
      this.ponto = val;
    });
  }

  onSubmitForm() {
    this.isLoading = true;

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
    if (this.checkPontoExists(formattedDate)) {
      this.utilsService.onPresentNotification(
        this.translate.instant("app.views.home.errors.ponto_exists"),
        TypeNotifcation.warning
      );
      this.isLoading = false;
      return;
    }
    if(!this.checkPontoValidity(ponto)) {
      this.utilsService.onPresentNotification(
        this.translate.instant("app.views.home.errors.diff_time"),
        TypeNotifcation.warning
      );
      this.isLoading = false;
      return;
    }
    this.actionService.onStartDay(ponto, this.token).subscribe(response => {
      const val = JSON.parse(JSON.stringify(response));
      this.isLoading = false;

      this.utilsService.onPresentNotification(
        this.translate.instant("app.views.home.submit_time"),
        TypeNotifcation.success
      );

      if(this.checkDate(new Date(ponto.entrada), new Date())) {
        this.ponto = {
          ...ponto,
          id: val
        };
      }

    });
  }

  checkPontoExists(date: Date) {
    if (this.ponto) {
      const pontoDate = new Date(this.ponto.entrada);

      if (this.checkDate(date, pontoDate)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  checkPontoValidity(ponto: Ponto) {
    if (ponto.saida < ponto.entrada || ponto.voltaAlmoco < ponto.inicioAlmoco) {
      return false;
    } else if (
      (!ponto.voltaAlmoco && ponto.inicioAlmoco) ||
      (ponto.voltaAlmoco && !ponto.inicioAlmoco)
    ) {
      return false;
    } else {
      return true;
    }
  }

  formatDateInputToDate(year: number, month: number, day: number) {
    const date = new Date();
    date.setDate(day);
    date.setFullYear(year);
    date.setMonth(month - 1);
    return date;
  }

  formatTimeInputsToDate(hour: number, minute: number, date: Date) {
    date.setHours(hour);
    date.setMinutes(minute);
    return date.toISOString();
  }
}
