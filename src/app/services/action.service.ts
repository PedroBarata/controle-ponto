import { Status, Ponto } from "../model/ponto.model";
import { UtilsService } from "./utils.service";
import { TypeNotifcation } from "../model/notification.ui";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ActionService {
  private BACKEND_URL = environment.apiUrl + "/ponto.json?auth=";
  private PUT_BACKEND_URL = environment.apiUrl + "/ponto/";

  constructor(private utils: UtilsService, private http: HttpClient) {}

  onStartDay(ponto: Ponto, token) {
    return this.http.post(this.BACKEND_URL + token, ponto);
  }

  updateDay(ponto: Ponto, token) {
    return this.http.put(
      this.PUT_BACKEND_URL + ponto.id + ".json" + "?auth=" + token,
      ponto
    );
  }

  getDay(ponto: Ponto, token) {
    return this.http.get<Ponto>(
      this.BACKEND_URL +
        token +
        '&orderBy="entrada"&startAt="' +
        ponto.entrada +
        '"&endAt="' +
        ponto.saida +
        '"'
    );
  }

  getAllByMonth(ponto: Ponto, token) {
    return this.http.get<Ponto>(
      this.BACKEND_URL + token + '&orderByDesc="entrada"&mes="' + ponto.mes + '"'
    );
  }

  sendInfo(status: Status) {
    const now = new Date();
    const minutes =
      now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    let message = "";
    if (status.valueOf() === Status.Started) {
      message = `Perfeito, seu dia começou às ${now.getHours()}:${minutes}`;
    }
    if (status.valueOf() === Status.Paused) {
      message = `Dia pausado às ${now.getHours()}:${minutes}`;
    }
    if (status.valueOf() === Status.Returned) {
      message = `Retornou do almoço às ${now.getHours()}:${minutes}`;
    }
    if (status.valueOf() === Status.Stopped) {
      message = `Seu dia terminou às ${now.getHours()}:${minutes}, bom descanso!`;
    }

    this.utils.onPresentNotification(message, TypeNotifcation.success);
  }
}
