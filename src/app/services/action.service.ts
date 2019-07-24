import { Injectable } from "@angular/core";
import { Actions } from "../model/ponto.model";
import { UtilsService } from "./utils.service";
import { TypeNotifcation } from "../model/notification.ui";

@Injectable({
  providedIn: "root"
})
export class ActionService {
  constructor(private utils: UtilsService) {}

  sendInfo(action: Actions) {
    const now = new Date();
    const minutes =
      now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    let message = "";
    if (action.valueOf() === Actions.Paused) {
      message = `Dia pausado às ${now.getHours()}:${minutes}`;
    }
    if (action.valueOf() === Actions.Started) {
      message = `Perfeito, seu dia começou às ${now.getHours()}:${minutes}`;
    }
    if (action.valueOf() === Actions.Stopped) {
      message = `Seu dia terminou às ${now.getHours()}:${minutes}, bom descanso!`;
    }

    this.utils.onPresentNotification(message, TypeNotifcation.success);
  }
}
