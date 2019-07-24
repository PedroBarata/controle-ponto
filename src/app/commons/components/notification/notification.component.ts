import { Component, Input, OnInit } from "@angular/core";
import { TypeNotifcation, NotificationUI } from "src/app/model/notification.ui";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent {
  private _notification: NotificationUI;
  public title: string;
  public icon: string;
  constructor() {}

  @Input()
  set notification(value: NotificationUI) {
    this._notification = value;
    console.log(value);

    if (this._notification) {
      this.checkType(this._notification.type);
    }
    this.showNotification();
  }

  get notification() {
    return this._notification;
  }

  checkType(type: TypeNotifcation) {
    switch (type) {
      case TypeNotifcation.warning:
        this.title = "warning";
        this.icon = "fa fa-exclamation-triangle";
        return "alert-warning";

      case TypeNotifcation.danger:
        this.title = "error";
        this.icon = "fa fa-exclamation-circle";
        return "alert-danger";

      case TypeNotifcation.info:
        this.title = "info";
        this.icon = "fa fa-info-circle";
        return "alert-info";

      default:
        this.title = "success";
        this.icon = "fa fa-check-circle";
        return "alert-success";
    }
  }
  showNotification() {
    setTimeout(() => {
      if(this._notification)
      this._notification.isPresent = false;
    }, 3000);
  }
}
