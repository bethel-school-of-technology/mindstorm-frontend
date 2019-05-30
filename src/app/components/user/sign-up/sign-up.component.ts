import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

/**
 * The Signup Component
 */

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

/**
 * @Ignore
 */
  constructor(public userService: UserService) {}

  ngOnInit() {
    this.authStatusSub = this.userService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  /**
   * This function performs a signin method and tells them that the app is loading and checks
   * and creates a user
   * @param form NgForm
   */
  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    /**
     * Uses userService and createUser and checks values.
     */
    this.isLoading = true;
    this.userService.createUser(form.value.email, form.value.password);
  }

  /**
   * Unsubscribes using rxjs Subscription.
   */
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
