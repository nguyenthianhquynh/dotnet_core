import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Shipments } from 'src/app/models/shipment';

@Component({
  selector: 'app-checkout-shipment',
  templateUrl: './checkout-shipment.component.html',
  styleUrls: ['./checkout-shipment.component.scss']
})
export class CheckoutShipmentComponent {
  @Input() checkoutForm?: FormGroup;
  @Input() shipments?: Shipments;
}
