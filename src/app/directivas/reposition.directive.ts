import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appReposition]'
})
export class RepositionDirective {
  constructor(public el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.repositions('80px', '20px');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.repositions('', '');
  }

  private repositions(right: string, bottom: string) {
    this.el.nativeElement.style.position = 'absolute';
    this.el.nativeElement.style.right = right;
    this.el.nativeElement.style.top = top;

  }

}
