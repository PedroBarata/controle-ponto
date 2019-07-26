import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import {
  NgbDropdownModule,
  NgbCalendarGregorian,
  NgbDatepickerI18n,
  NgbCalendar,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import { PageSubheaderComponent } from "./components/page-subheader/page-subheader.component";
import { NotificationComponent } from "./components/notification/notification.component";
import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { StatModule } from "./shared/modules";
import { DatePickerComponent } from "./layout/components/date-picker/date-picker.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TimepickerComponent } from "./layout/components/timepicker/timepicker.component";
import { NgbDatepickerI18nDefault } from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-i18n";
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
  TimepickerComponent
];

@NgModule({
  declarations: [COMPONENTS, DIRECTIVES, PIPES],
  imports: [CommonModule, MODULES],
  exports: [MODULES, COMPONENTS, DIRECTIVES, PIPES],
  providers: [SERVICES]
})
export class SharedModule {}
