import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlankLayoutComponent } from "./commons/layout/blank-layout/blank-layout.component";
import { AuthLayoutComponent } from "./commons/layout/auth-layout/auth-layout.component";
import { AdminLayoutComponent } from "./commons/layout/admin-layout/admin-layout.component";
import { LandingLayoutComponent } from './commons/layout/landing-layout/landing-layout.component';

const routes: Routes = [
  {
    path: "",
    component: BlankLayoutComponent,
    children: [
      {
        path: "",
        component: LandingLayoutComponent,
        children: [
          {
            path: "",
            loadChildren: "./views/landing/landing.module#LandingModule"
          }
        ]
      },
      {
        path: "",
        component: AuthLayoutComponent,
        children: [
          { path: "auth", loadChildren: "./views/auth/auth.module#AuthModule" }
        ]
      },
      {
        path: "app",
        component: AdminLayoutComponent,
        children: [
          { path: "home", loadChildren: "./views/home/home.module#HomeModule" }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
