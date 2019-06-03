import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from '../user.service';

/**
 * The Login Component.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  /*** @property isLoading for mat-spinner in the html file */
  isLoading = false;

  /**
   * authStatusSub Subscription from rxjs library
   * and unsubscribes in the ngOnDestroy function.
   */
  private authStatusSub: Subscription;

  /** @Ignore */
  constructor(public userService: UserService) { }

  /**
   * Performs a listen function for the user's status.
   */
  ngOnInit() {
    this.authStatusSub = this.userService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  /**
   * This function performs a login method.
   * @param form NgForm.
   */
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService.login(form.value.email, form.value.password);
  }

  /** Performs an unsubscription on authStatusSub. */
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
