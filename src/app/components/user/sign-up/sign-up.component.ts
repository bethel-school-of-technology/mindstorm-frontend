import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthServiceService } from "../auth-service.service";

/**
 * The SignIn Component
 */

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  /**
   * @Ignore
   */
  constructor(public authService: AuthServiceService) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  /**
   *
   * @param form of type NgForm
   *
   * This function performs a signin method and tells them that the app is loading and checks
   *
   * and creates a user
   */

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    /**
     * Uses authService and createUser and checks values.
     */
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
