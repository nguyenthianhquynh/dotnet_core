import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggleIcon]'
})
export class ToggleIconDirective {

  @Input() appToggleIcon = '';
  @Input() icon = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') onClick() {
    this.changeIcon(this.appToggleIcon);
  }

  private changeIcon(icon: string) {
    if (icon === 'angle-right') {
      this.appToggleIcon = 'angle-down';
    } else {
      this.appToggleIcon = 'angle-right';
    }

    this.renderer.setAttribute(this.el.nativeElement, 'icon', this.appToggleIcon);
    //change property binding
    this.icon = this.appToggleIcon;
  }

  getIcon() {
    return this.icon;
  }
  
}
