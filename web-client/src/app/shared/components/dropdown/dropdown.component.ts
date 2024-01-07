import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() isActive = false;
  @Input() itemCurr: any;
  @Input() text = "Category";
  @Input() listItems: any;
  @Input() isFirst = true;

  test: any;

  icon = "angle-right";

  constructor() {
    console.log(this.listItems);
  }
  
  ngAfterViewInit(){

  }

  ngOnInit(): void {
    this.listItems = [{
      id: 0,
      name: this.text,
      types: this.listItems,
    }]
    this.updateListItems(this.listItems);
    this.test = this.listItems;
  }

  toggle(curItem: any) {
    //checck current item undefined
    if (curItem === undefined) {
      this.itemCurr = this.test[0];
      this.itemCurr.isShow = !this.itemCurr.isShow;
      return;
    }

    this.itemCurr.isShow = !this.itemCurr.isShow;
    this.icon = this.itemCurr.isShow ? "angle-down" : "angle-right";

    // this.test = this.test.map((item: any) => {
    //   if (item.id === curItem.id) {
    //     item.isShow = !item.isShow;
    //     this.icon = item.isShow ? "angle-down" : "angle-right";
    //   }
      
    //   return item;
    // }
    // )
  }

  updateListItems(listItems: []) {
    listItems.map((item: any) => {
      if(item.types){
        item.isShow = false;
        this.updateListItems(item.types);
      }
      return item;
    })
  }
}