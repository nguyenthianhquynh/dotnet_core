import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CardItemComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule // <-- Add this,
  ]
})
export class DashboardModule { }
