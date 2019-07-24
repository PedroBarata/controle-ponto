import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { NotificationUI } from "src/app/model/notification.ui";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  private notificationSub: Subscription;
  public notification: NotificationUI;

  collapedSideBar: boolean;

  constructor(private utils: UtilsService) {}

  ngOnInit() {
    this.notificationSub = this.utils
      .getNotificationListener()
      .subscribe(notification => {
        this.notification = notification;
      });
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  ngOnDestroy() {
    this.notificationSub.unsubscribe();
  }
}
