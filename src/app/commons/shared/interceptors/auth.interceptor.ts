import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "key=" + authToken
    });
    console.log(headers);

    const authRequest = req.clone({
      headers: headers
    });

    return next.handle(authRequest);
  }
}
