import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEmbiggens]'
})
export class EmbiggensDirective {
  constructor(public el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.embiggens('45px');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.embiggens('');
  }

  private embiggens(height: string) {
    this.el.nativeElement.style.height = height;

  }
}
