import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[maxNumber]'
})
export class MaxNumberDirective {

  @Input() maxNumber: number = 0;
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: { stopPropagation: () => void; }) {
    const initalValue = this._el.nativeElement.value;

    if (initalValue > this.maxNumber) {
      this._el.nativeElement.value = '';
      event.stopPropagation();
    }
  }

}