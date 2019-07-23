import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DefaultHomeComponent } from './default-home/default-home.component';
import { SharedModule } from 'src/app/commons/shared.module';
import { TimeControllerComponent } from './components/time-controller/time-controller.component';

@NgModule({
  declarations: [DefaultHomeComponent, TimeControllerComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
