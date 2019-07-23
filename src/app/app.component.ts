import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { NotificationUI } from "./model/notification.ui";
import { UtilsService } from "./services/utils.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "controle-ponto";

  isLoading = false;
  loadingStatusSub: Subscription;

  constructor(private utils: UtilsService) {}

  ngOnInit() {
    this.loadingStatusSub = this.utils
      .getLoadingListener()
      .subscribe(loadingStatus => {
        this.isLoading = loadingStatus;
      });
  }

  ngOnDestroy() {
    this.loadingStatusSub.unsubscribe();
  }
}
