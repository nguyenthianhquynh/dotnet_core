import { NgModule, forwardRef } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './checkout.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CustomStepperComponent } from '../shared/custom-stepper/custom-stepper.component';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule, // declare the components that we want to use  this module
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    OverlayModule,
    forwardRef(() => CustomStepperComponent), CdkStepperModule
  ],
  exports: [
  ],
})
export class CheckoutModule { }
