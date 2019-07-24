import { Component, OnInit, Input } from "@angular/core";
import { DateService } from "src/app/services/date.service";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-page-subheader",
  templateUrl: "./page-subheader.component.html",
  styleUrls: ["./page-subheader.component.scss"]
})

export class PageSubheaderComponent implements OnInit {
  @Input() page: string;

  public subtitle: string = "";
  public breadcrumb: string = "";
  public displayName: string;
  constructor(private dateService: DateService, private authService: AuthService) {}

  ngOnInit() {
    const now = new Date();
    this.formatBreadCrumb(now);
    this.subtitle = this.dateService.getHour(now);
    this.displayName = this.authService.getDisplayName();
  }

  formatBreadCrumb = (date: Date) => {
    const month = this.dateService.getMonth(date);
    this.breadcrumb = `${date.getDate()} de ${month} de ${date.getFullYear()}`
  }
}
