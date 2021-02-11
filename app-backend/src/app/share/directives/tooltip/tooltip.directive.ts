import { Directive, ElementRef, HostListener, Input } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  @Input() tooltip: string;

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.setAttribute('data-toggle', 'tooltip');
    this.elementRef.nativeElement.setAttribute('data-html', 'true');
    this.elementRef.nativeElement.setAttribute(
      'data-placement',
      this.tooltip ? this.tooltip : 'top'
    );
  }

  @HostListener('mouseenter')
  public onToolTipShow(): void {
    this.elementRef.nativeElement.setAttribute(
      'data-placement',
      this.tooltip ? this.tooltip : 'top'
    );
    $(this.elementRef.nativeElement).tooltip('show');
  }

  @HostListener('click')
  @HostListener('mouseleave')
  public onToolTipHide(): void {
    $(this.elementRef.nativeElement).tooltip('dispose');
  }

}
