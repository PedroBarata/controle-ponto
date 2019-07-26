import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.scss"]
})
export class DatePickerComponent implements OnInit {
  date: any;
  @Input() label: string;
  @Input() parentForm: FormGroup;
  @Input() controlName: string;
  constructor() {}

  ngOnInit() {}
}
