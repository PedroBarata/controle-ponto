import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit {
  public form: FormGroup;

  constructor(private router: Router, private utils: UtilsService, private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      displayName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmitForm() {
    const user = this.form.value;
    this.utils.onLoading();
    this.authService.createUser(user).subscribe(
      response => {

        this.authService.loginHandler(response);
        this.router.navigate(["/app/home"]);
        this.utils.dismissLoading();
      },
      error => {
        this.authService.setAuthListener();
        this.utils.dismissLoading();
      }
    );
  }
}
