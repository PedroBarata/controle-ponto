import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BlankLayoutComponent } from "./blank-layout/blank-layout.component";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";

import { SharedModule } from "../shared.module";
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    BlankLayoutComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [CommonModule, SharedModule]
})
export class LayoutModule {}
