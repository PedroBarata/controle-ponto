import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { UtilsService } from "src/app/services/utils.service";
import { NotificationUI } from "src/app/model/notification.ui";

@Component({
  selector: "app-auth-layout",
  templateUrl: "./auth-layout.component.html",
  styles: []
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  private notificationSub: Subscription;
  public notification: NotificationUI;

  constructor(private utils: UtilsService) {}

  ngOnInit() {
    this.notificationSub = this.utils
      .getNotificationListener()
      .subscribe(notification => {
        this.notification = notification;
      });
  }

  ngOnDestroy() {
    this.notificationSub.unsubscribe();
  }
}
