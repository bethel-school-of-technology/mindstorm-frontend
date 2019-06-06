import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../user/user.service';

/** Header component */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  /** Checks user authorization */
  userIsAuthenticated = false;

  /**
   * authListenerSubs rxjs Subscription.
   * Unsubscribes in ngOnDestroy function.
   */
  private authListenerSubs: Subscription;

  /** @ignore */
  constructor(private userService: UserService) { }

  /** Performs an authentication from the authService */
  ngOnInit() {
    this.userIsAuthenticated = this.userService.getIsAuth();
    this.authListenerSubs = this.userService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  /** Performs logout function */
  onLogout() {
    this.userService.logout();
  }

  /** Unsubscribes from authListenerSubs property */
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
