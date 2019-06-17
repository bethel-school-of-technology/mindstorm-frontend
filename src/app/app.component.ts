import { Component, OnInit } from '@angular/core';

import { UserService } from './shared/service/user.service';
/**
 * The main component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: UserService) {}
  otherTheme = false;

  /**
   * title is referred to as frontend.
   */
  title = 'Mindstorm';

  /** Changes light theme to dark theme */
  changeTheme() {
    this.otherTheme = !this.otherTheme;
  }

  /** Keep user logged in after refresh */
  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
