import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

/**
 * The Login Component.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * @Ignore
   */
  constructor(public authService: AuthServiceService) { }

  /**
   * Empty ngOnInit.
   */
  ngOnInit() {
  }

  /**
   * This function performs a login method.
   * @param form of type NgForm.
   */
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
}
