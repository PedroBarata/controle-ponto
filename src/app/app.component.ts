import { Component, OnInit, OnDestroy } from "@angular/core";
import { UtilsService } from "./services/utils.service";
import { Subscription } from "rxjs";

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
