import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../pages/auth/auth.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  isMobile = false;
  shipments = [
    {
      "shortName": "Today",
      "deliveryTime": "1 Day",
      "description": "Fastest delivery time",
      "price": 10,
      "id": 1
    },
    {
      "shortName": "Quickly",
      "deliveryTime": "2-5 Days",
      "description": "Get it within 5 days",
      "price": 5,
      "id": 2
    },
    {
      "shortName": "FREE",
      "deliveryTime": "1-2 Weeks",
      "description": "Free! You get what you pay for",
      "price": 0,
      "id": 3
    }
  ]

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, public authService: AuthService) {
    this.authService.GetUserAddress().subscribe((addresses) => {
      if (addresses) {
        this.checkoutForm.get('addressForm')?.patchValue(addresses[0]); //addresses.find(x => x.isMainAddress === true));
      }
    })
  }
  
  ngOnInit(): void {
  }

  checkoutForm = this._formBuilder.group({
    addressForm: this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    }),
    deliveryForm: this._formBuilder.group({
      deliveryMethod: ['', Validators.required]
    }),
    paymentForm: this._formBuilder.group({
      nameOnCard: ['', Validators.required]
    })
  })
}
