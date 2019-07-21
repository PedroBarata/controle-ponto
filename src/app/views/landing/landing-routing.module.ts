import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLandingComponent } from './default-landing/default-landing.component';
import { SignUpByTokenComponent } from './sign-up-by-token/sign-up-by-token.component';

const routes: Routes = [
  { path: 'home', component: DefaultLandingComponent },
  { path: 'signup', component: SignUpByTokenComponent },
  { path: 'signup/:token', component: SignUpByTokenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
