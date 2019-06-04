import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from '../user.service';

/**
 * The Signup Component.
 */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  /*** @property isLoading for mat-spinner in the html file */
  isLoading = false;

  /**
   * authStatusSub Subscription from rxjs library
   * and unsubscribes in the ngOnDestroy function.
   */
  private authStatusSub: Subscription;

  /** @Ignore */
  constructor(public userService: UserService) {}

  /** Performs a status listener on the user. */
  ngOnInit() {
    this.authStatusSub = this.userService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  /**
   * Performs a signup method and tells them that the site is loading and checks
   * and creates a user
   * @param form NgForm
   */
  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    /** Uses userService and createUser and checks values. */
    this.isLoading = true;
    this.userService.createUser(form.value.email, form.value.password);
  }

  /** Unsubscribes using rxjs Subscription. */
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
