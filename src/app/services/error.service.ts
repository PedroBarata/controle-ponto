import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})
export class ErrorService {
  constructor(private translate: TranslateService) {}

  formatErrorMessage(error: string) {
    if (error === "INVALID_EMAIL") {
      return this.translate.instant("app.errors.invalid_email");
    }
    if (error === "WEAK_PASSWORD") {
      return this.translate.instant("app.errors.weak_password");
    }
    if (error === "USER_EXISTS") {
      return this.translate.instant("app.errors.user_exists");
    }
    if (error === "INVALID_CUSTOM_TOKEN") {
      return this.translate.instant("app.errors.invalid_custom_token");
    }
    if (error === "CUSTOM_TOKEN_MISMATCH") {
      return this.translate.instant("app.errors.custom_token_mismatch");
    }
    if (error === "INVALID_CREDENTIAL") {
      return this.translate.instant("app.errors.invalid_credential");
    }
    if (error === "WRONG_PASSWORD") {
      return this.translate.instant("app.errors.wrong_password");
    }
    if (error === "USER_MISMATCH") {
      return this.translate.instant("app.errors.user_mismatch");
    }
    if (error === "ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL") {
      return this.translate.instant(
        "app.errors.account_exists_with_different_credential"
      );
    }
    if (error === "EMAIL_ALREADY_IN_USE") {
      return this.translate.instant("app.errors.email_already_in_use");
    }
  }
}
