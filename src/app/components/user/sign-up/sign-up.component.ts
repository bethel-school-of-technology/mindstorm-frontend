import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

/**
 * The SignIn Component
 */

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

/**
 * @Ignore
 */
  constructor(public authService: AuthServiceService) {}

/**
 * Empty ngOnInIt
 */

  ngOnInit() {
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
    this.authService.createUser(form.value.email, form.value.password);
  }

}
