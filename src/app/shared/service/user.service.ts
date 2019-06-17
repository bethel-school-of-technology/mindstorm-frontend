import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from '../../shared/models/user.model';
import { environment } from '../../../environments/environment';

/**
 * This variable connects the frontend to the backend's api route
 * and is stored in the environment folder.
 */
const backendURL = environment.apiURL + '/user/';

/**
 * User service for login and signup, story-list and story-post,
 * character-list and character-post, and comment-list and comment-post commponents.
 * See {@link User} for class model.
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  /** Checks user's authorization */
  private isAuthenticated = false;

  /** token string used to get a token for verification */
  private token: string;

  /** tokenTimer used to set login duration */
  private tokenTimer: any;

  /** authStatusListener set to a new Subject, true or false */
  private authStatusListener = new Subject<boolean>();

  /** userId string for the user's id */
  private userId: string;

  /** @ignore */
  constructor(private http: HttpClient, private router: Router) {}

  /** Returns the user's token. */
  getToken() {
    return this.token;
  }

  /** Returns an authenticated status as false. */
  getIsAuth() {
    return this.isAuthenticated;
  }

  /** Returns a listener for the user's status. */
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  /** Returns the user's id. */
  getUserId() {
    return this.userId;
  }

  /**
   * Performs a POST method for creating a user, as well as logging in the user once signed up.
   * @param email string
   * @param password string
   */
  createUser(email: string, password: string) {
    const user: User = { email, password };
    this.http.post(backendURL + 'signup', user).subscribe(
      () => {
        this.login(email, password);
        this.router.navigate(['/']);
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }

  /**
   * Performs a POST method for posting the token, user's id, and time until expiration.
   * Subscribes to the private methods of setAuthTimer and saveAuthData.
   * @param email string
   * @param password string
   */
  login(email: string, password: string) {
    const user: User = { email, password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        backendURL + 'login',
        user
      )
      .subscribe(
        response => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['/']);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  /**
   * Performs a function that uses the private method getAuthData for setting up
   * the user's login timer.
   */
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  /** Performs the logout function by clearing the timer and user data. */
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  /**
   * Sets the login time session until logout.
   * @param duration number
   */
  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  /**
   * Saves the user's data on login.
   * @param token string
   * @param expirationDate Date
   * @param userId string
   */
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  /**
   * Clears the user's data on logout.
   */
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  /**
   * Gets the user's data to determine whether they're authenticated or not.
   */
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      userId,
      expirationDate: new Date(expirationDate)
    };
  }
}
