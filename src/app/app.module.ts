import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./commons/shared";
import { LanguageTranslationModule } from "./commons/shared/modules/language-translation/language-translation.module";
import { SharedModule } from "./commons/shared.module";
import { LayoutModule } from "./commons/layout/layout.module";
import { AuthInterceptor } from "./commons/shared/interceptors/auth.interceptor";
import { ErrorInterceptor } from "./commons/shared/interceptors/error.interceptor";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LanguageTranslationModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule
  ],
  declarations: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
