import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryOrderComponent } from './summary-order/summary-order.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SummaryOrderComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    SummaryOrderComponent,
    TextInputComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
