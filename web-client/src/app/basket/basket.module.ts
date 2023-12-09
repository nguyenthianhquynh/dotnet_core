import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketRoutingModule } from './basket-routing.module';
import { RouterModule } from '@angular/router';
import { BasketComponent } from './basket.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BasketRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class BasketModule { }
