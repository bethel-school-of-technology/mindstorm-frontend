import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

/** Error component is used to show a dialog popup for login and signup errors */
@Component({
  templateUrl: './error.component.html'
})
export class ErrorComponent {
  /** @ignore */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
