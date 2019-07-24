import { Status, Ponto } from "../model/ponto.model";
import { UtilsService } from "./utils.service";
import { TypeNotifcation } from "../model/notification.ui";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})

export class ActionService {
  private BACKEND_URL = environment.apiUrl + "/ponto.json";
  private PUT_BACKEND_URL = environment.apiUrl + "/ponto/";


  constructor(private utils: UtilsService, private http: HttpClient) {}

  onStartDay(ponto) {
    return this.http.post(this.BACKEND_URL, ponto);
  }

  updateDay(ponto) {
    return this.http.put(this.PUT_BACKEND_URL + ponto.id + ".json", ponto);
  }

  getDay(ponto) {
    return this.http.get<Ponto>(this.BACKEND_URL, ponto);
  }

  getAllByMonth(ponto) {
    return this.http.get<Ponto>(this.BACKEND_URL, ponto);
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
