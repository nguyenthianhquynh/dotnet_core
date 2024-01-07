import { Component, EventEmitter, Inject, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { DialogData } from 'src/app/models/dialogData';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, NgTemplateOutlet],
})
export class DialogComponent {
  @Input() modalBody!: TemplateRef<any>;
  @Input() myContext!: any;
  
  addresses: any = [
    {
      "firstName": "Bob",
      "lastName": "Bobbity",
      "phoneNumber": null,
      "street": "10 The Street",
      "city": "New York",
      "state": "NY",
      "zipcode": "90210",
      "id": 1,
      "isDefault": true
    },
    {
      "firstName": "Bob11111",
      "lastName": "Bobbity",
      "phoneNumber": null,
      "street": "10 The Street",
      "city": "New York",
      "state": "NY",
      "zipcode": "90210",
      "id": 1,
      "isDefault": true
    },
  ]
  
  estimateTemplate:any;
  ctx:any;
  
  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public dialog: DialogData,
  ) { }
}
