import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/commons/shared.module";
import { GraphRoutingModule } from "./graph-routing.module";
import { GraphViewPage } from "./graph-view/graph-view.page";

@NgModule({
  declarations: [GraphViewPage],
  imports: [CommonModule, GraphRoutingModule, SharedModule]
})
export class GraphModule {}
