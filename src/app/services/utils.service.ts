import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { NotificationUI, TypeNotifcation } from "../model/notification.ui";

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  private _loadingListener = new Subject<boolean>();

  constructor() {}

  getLoadingListener() {
    return this._loadingListener.asObservable();
  }

  onLoading() {
    this._loadingListener.next(true);
  }

  dismissLoading() {
    this._loadingListener.next(false);
  }

  onPresentNotification(msg: string, type: TypeNotifcation) {
   return { msg: msg, type: type, isPresent: true };
  }

  dismissNotification() {
    return { isPresent: false };
  }
}
