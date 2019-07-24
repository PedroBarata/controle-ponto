import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-blank-layout",
  templateUrl: "./blank-layout.component.html",
  styles: []
})
export class BlankLayoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {

    this.authService.autoAuthUser();
    const auth = this.authService.getIsAuth();
    if (auth) {
      this.router.navigate(["/app/home"]);
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }
}
