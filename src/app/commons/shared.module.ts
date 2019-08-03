import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbDateParserFormatter, NgbDropdownModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { NotificationComponent } from "./components/notification/notification.component";
import { PageSubheaderComponent } from "./components/page-subheader/page-subheader.component";
import { DatePickerComponent } from "./layout/components/date-picker/date-picker.component";
import { TimepickerComponent } from "./layout/components/timepicker/timepicker.component";
import { StatModule } from "./shared/modules";
import { CustomDateParserFormatter } from './shared/parsers/custom-date-parser-formatter';

const MODULES = [
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  HttpClientModule,
  TranslateModule,
  NgbDropdownModule,
  Ng2GoogleChartsModule,
  StatModule,
  NgbModule
];

const SERVICES = [
  HttpClient,
  { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
];

const DIRECTIVES = [];

const PIPES = [];

const COMPONENTS = [
  PageSubheaderComponent,
  NotificationComponent,
  NotificationComponent,
  DatePickerComponent,
  TimepickerComponent,
];

@NgModule({
  declarations: [COMPONENTS, DIRECTIVES, PIPES],
  imports: [CommonModule, MODULES],
  exports: [MODULES, COMPONENTS, DIRECTIVES, PIPES],
  providers: [SERVICES]
})
export class SharedModule {}
