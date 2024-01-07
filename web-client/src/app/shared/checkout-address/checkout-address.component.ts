import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { Address } from 'src/app/models/address';
import { DynamicModalDirective } from 'src/app/directive/dynamic-modal.directive';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogSelectAddressComponent } from '../dialog-select-address/dialog-select-address.component';


@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup;
  animal: Address | undefined;
  name: string = 'select an address';

  @ViewChild(DynamicModalDirective, { static: true }) modalDirective!: DynamicModalDirective;
  modalContentTemplate!: TemplateRef<any>; // Declare the property here

  constructor(public dialog: Dialog) { }

  // openDialog() {
  //   if (this.modalDirective) {
  //     this.modalContentTemplate = this.modalDirective.viewContainerRef.createEmbeddedView(this.modalContentTemplate).rootNodes[0];
  //     const modalData = { modalContent: this.modalContentTemplate };

  //     const dialogRef = this.dialog.open(DynamicModalComponent, {
  //       data: modalData,
  //       width: '400px',
  //     });
  //   } else {
  //     console.error('modalDirective is not defined. Make sure the view has been initialized.');
  //   }
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open<string>(DialogSelectAddressComponent, {
      width: '350px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.closed.subscribe(result => {
      console.log('The dialog was closed');
      this.checkoutForm?.get('addressForm')?.patchValue(result);
    });
  }
}
