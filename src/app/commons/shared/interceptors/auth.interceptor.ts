import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req);

    const authToken = this.authService.getToken();
    console.log(authToken);

    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "key=" + authToken)
    });

    return next.handle(authRequest);
  }
}
