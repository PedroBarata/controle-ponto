import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private router: Router, private utils: UtilsService, private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmitForm() {
    const user = this.form.value;
    console.log( this.form.get('email').hasError);

    this.utils.onLoading();
    this.authService.login(user).subscribe(
      response => {
        console.log(response);

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
