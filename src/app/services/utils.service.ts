import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationUI, TypeNotifcation } from '../model/notification.ui';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private _loadingListener = new Subject<boolean>();
  private _notificationListener = new Subject<NotificationUI>();

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

  getNotificationListener() {
    return this._notificationListener.asObservable();
  }

  onPresentNotification(msg: string, type: TypeNotifcation) {
    this._notificationListener.next({ msg: msg, type: type, isPresent: true });
  }

  dismissNotification() {
    this._notificationListener.next({ isPresent: false });
  }

  transformDataArray(data) {
    return Object.keys(data)
      .map(key => {
        return [
          ...Array({
            id: key,
            ...data[key],
          }),
        ];
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  }
}
