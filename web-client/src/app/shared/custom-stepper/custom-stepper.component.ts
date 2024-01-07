import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-stepper',
  templateUrl: './custom-stepper.component.html',
  styleUrls: ['./custom-stepper.component.scss'],
  standalone: true,
  providers: [{ provide: CdkStepper, useExisting: CustomStepperComponent }],
  imports: [NgTemplateOutlet, CdkStepperModule,CommonModule],
})
export class CustomStepperComponent extends CdkStepper {
  isMobile = false;
  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }
}
