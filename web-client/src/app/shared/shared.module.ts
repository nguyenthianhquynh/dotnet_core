import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { SummaryOrderComponent } from './summary-order/summary-order.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomStepperComponent } from './custom-stepper/custom-stepper.component';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutShipmentComponent } from './checkout-shipment/checkout-shipment.component';
import { SelectedProductsComponent } from './selected-products/selected-products.component';
import { RouterModule } from '@angular/router';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';

import { DialogModule } from '@angular/cdk/dialog';
import { DialogSelectAddressComponent } from './dialog-select-address/dialog-select-address.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { DynamicModalDirective } from '../directive/dynamic-modal.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ToggleIconComponent } from './components/toggle-icon/toggle-icon.component';
import { IconComponent } from './components/icon/icon.component';
import { ToggleIconDirective } from './components/toggle-icon/toggle-icon.directive';



@NgModule({
  declarations: [
    SummaryOrderComponent,
    TextInputComponent,
    CheckoutAddressComponent,
    CheckoutShipmentComponent,
    SelectedProductsComponent,
    CheckoutPaymentComponent,
    DialogSelectAddressComponent,
    DropdownComponent,
    ToggleIconComponent,
    ToggleIconDirective,
    IconComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DialogModule,
    OverlayModule,
    MatDialogModule,
    DialogComponent
  ],
  exports:[
    SummaryOrderComponent,
    TextInputComponent,
    FormsModule,
    ReactiveFormsModule,
    CheckoutAddressComponent,
    CheckoutShipmentComponent,
    SelectedProductsComponent,
    CheckoutPaymentComponent,
    DropdownComponent,
    ToggleIconComponent,
    IconComponent,
    ToggleIconDirective
  ],
})
export class SharedModule { }
