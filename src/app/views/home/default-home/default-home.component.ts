import { Component, OnInit } from "@angular/core";
import { DateService } from "src/app/services/date.service";
import { Actions } from "src/app/model/ponto.model";
import { UtilsService } from "src/app/services/utils.service";
import { TypeNotifcation, NotificationUI } from "src/app/model/notification.ui";

@Component({
  selector: "app-default-home",
  templateUrl: "./default-home.component.html",
  styleUrls: ["./default-home.component.scss"]
})
export class DefaultHomeComponent implements OnInit {
  public notification: NotificationUI;
  constructor(private utils: UtilsService) {}

  ngOnInit() {}

  onSubmitAction(action: Actions) {
    this.notification = this.utils.onPresentNotification(
      this.formatAction(action),
      TypeNotifcation.success
    );
  }

  formatAction(action: Actions) {
    const now = new Date();
    if(action.valueOf() === Actions.Paused) {
      return `Dia pausado às ${now.getHours()}:${now.getMinutes()}`
    }
    if(action.valueOf() === Actions.Started) {
      return `Perfeito, seu dia começou às ${now.getHours()}:${now.getMinutes()}`
    }
    if(action.valueOf() === Actions.Stopped) {
      return `Seu dia terminou às ${now.getHours()}:${now.getMinutes()}, bom descanso!`
    }
  }
}
