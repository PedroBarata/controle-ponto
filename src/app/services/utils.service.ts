import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private _loadingListener = new Subject<boolean>();

  constructor() {
  }

  getLoadingListener() {
    return this._loadingListener.asObservable();
  }

  onLoading() {
    this._loadingListener.next(true);
  }

  dismissLoading() {
    this._loadingListener.next(false);
  }
}
