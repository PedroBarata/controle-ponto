import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { DefaultLandingComponent } from './default-landing/default-landing.component';
import { SignUpByTokenComponent } from './sign-up-by-token/sign-up-by-token.component';

@NgModule({
  declarations: [DefaultLandingComponent, SignUpByTokenComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
  ]
})
export class LandingModule { }
