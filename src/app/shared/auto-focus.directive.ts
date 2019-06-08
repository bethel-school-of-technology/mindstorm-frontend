import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

/** AutofocusDirective component.
 * Used to autofocus inputs on page load.
 */
@Directive({
  selector: '[appAutoFocus]'
})
export class AutofocusDirective implements AfterContentInit {
  @Input() public appAutoFocus: boolean;

  /** @ignore */
  public constructor(private el: ElementRef) {}

  /** Sets input focus */
  public ngAfterContentInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 500);
  }
}
