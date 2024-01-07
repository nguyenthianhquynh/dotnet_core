import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-dialog-select-address',
  templateUrl: './dialog-select-address.component.html',
  styleUrls: ['./dialog-select-address.component.scss']
})
export class DialogSelectAddressComponent {
  chooseAddress($event: any) {
    this.myContext.address = $event;
  }

  totalEstimate = 10;
  ctx = { estimate: this.totalEstimate };
  myContext = { $implicit: 'World', addresses: [], address: null};

  constructor(authService: AuthService) {
    authService.addresses$.subscribe
    (
      (addresses: any) => {
        this.myContext.addresses = addresses;
      }
    );
  }
}
