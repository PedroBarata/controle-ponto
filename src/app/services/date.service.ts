import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})
export class DateService {
  private _monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
  ];

  constructor(private translate: TranslateService) {}

  getHour = (date: Date) => {
    if (date.getHours() < 12) {
      return this.translate.instant("app.views.home.morning");
    }
    if (date.getHours() >= 12 && date.getHours() < 18) {
      return this.translate.instant("app.views.home.noon");
    } else {
      return this.translate.instant("app.views.home.morning");
    }
  };

  getMonth = (date: Date) => {
      return this.translate.instant(`app.months.${this._monthNames[date.getMonth()]}`);
  }
}
