import { Component, OnInit } from "@angular/core";
import { NotificationUI } from "src/app/model/notification.ui";
import { Actions } from "src/app/model/ponto.model";
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: "app-default-home",
  templateUrl: "./default-home.component.html",
  styleUrls: ["./default-home.component.scss"]
})
export class DefaultHomeComponent implements OnInit {
  public notification: NotificationUI;
  constructor(private actionService: ActionService) {}

  ngOnInit() {}

  onSubmitAction(action: Actions) {
    this.actionService.sendInfo(action);
  }
}
