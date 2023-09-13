import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CardItemComponent } from './components/card-item/card-item.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CardItemComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule // <-- Add this
  ]
})
export class DashboardModule { }
