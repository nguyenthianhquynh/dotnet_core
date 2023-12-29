import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterLoginComponent } from './after-login/after-login.component';
import { BeforeLoginComponent } from './before-login/before-login.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AfterLoginComponent,
    BeforeLoginComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule
  ],
  exports: [
    AfterLoginComponent,
    BeforeLoginComponent
  ]
})
export class LayoutsModule { }
