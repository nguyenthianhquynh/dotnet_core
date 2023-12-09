import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryOrderComponent } from './summary-order/summary-order.component';



@NgModule({
  declarations: [
    SummaryOrderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SummaryOrderComponent
  ]
})
export class SharedModule { }
