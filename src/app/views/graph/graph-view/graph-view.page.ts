import { Component, OnInit } from "@angular/core";
import { ActionService } from "src/app/services/action.service";
import { Ponto } from "src/app/model/ponto.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-graph",
  templateUrl: "./graph-view.page.html",
  styles: []
})
export class GraphViewPage implements OnInit {
  private userId: string;
  public pontoList: Ponto[] = [];
  constructor(
    private actionService: ActionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    const now = new Date();
    const ponto: Ponto = {
      id: undefined,
      status: undefined,
      userId: this.userId,
      mes: now.getMonth()
    };

    this.actionService.getAllByMonth(ponto).subscribe(response => {
      Object.entries(response).map(resp => {
        this.pontoList.push(resp[1]);
      })
      console.log(this.pontoList);
    });
  }
}
