import { Component, OnInit } from '@angular/core';

import { UserService } from './components/user/user.service';

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
  /**
   * title is referred to as frontend.
   */
  title = 'frontend';

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
