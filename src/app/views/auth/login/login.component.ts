import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private router: Router, private utils: UtilsService) { }

  ngOnInit() {
    console.log("entrou");
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmitForm() {
    console.log( this.form.get('email').hasError);

    this.utils.onLoading();
    setTimeout(() => {
      this.router.navigateByUrl('/app/home');
      this.utils.dismissLoading();
    }, 500);
  }
}
