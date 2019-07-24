import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { TypeNotifcation } from "src/app/model/notification.ui";
import { ErrorService } from 'src/app/services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private utils: UtilsService, private errorService: ErrorService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";
        if(error.error.error) {
          errorMessage = error.error.error.message;
        }
        errorMessage = this.errorService.formatErrorMessage(errorMessage);
        this.utils.onPresentNotification(errorMessage, TypeNotifcation.danger);
        return throwError(error);
      })
    );
  }
}
