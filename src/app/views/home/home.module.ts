import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DefaultHomeComponent } from './default-home/default-home.component';

@NgModule({
  declarations: [DefaultHomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
