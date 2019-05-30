import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  private authStatusSub: Subscription;

  /**
   * @Ignore
   */
  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  /**
   * This function performs a login method.
   * @param form NgForm.
   */
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.userService.login(form.value.email, form.value.password);
  }
}
