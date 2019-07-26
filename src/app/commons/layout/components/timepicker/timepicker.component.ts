import { Component, Input } from '@angular/core';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-timepicker',
    templateUrl: './timepicker.component.html',
    styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent {
    defaultTime = {hour: 13, minute: 30};
    @Input() label: string;
    @Input() parentForm: FormGroup
    @Input() controlName: string;

    SecondsTime: NgbTimeStruct = {hour: 13, minute: 30, second: 30};
    seconds = true;

    customTime: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
    hourStep = 1;
    minuteStep = 15;
    secondStep = 30;

}
