import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, merge, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedIn: boolean = false;

  private inactivitySubscription: Subscription | null = null;
  private inactivityTimeout: any;
  private countdownInterval: any;

  private inactivityDuration = 1800; // 30 minutes

  // 👇 User activity events that will reset the timer
  private activityEvents$ = merge(
    fromEvent(window, 'mousemove'),
    fromEvent(window, 'mousedown'),
    fromEvent(window, 'keypress'),
    fromEvent(window, 'touchstart'),
    fromEvent(window, 'scroll')
  );

  constructor(private router: Router, private ngZone: NgZone) {
    const token = localStorage.getItem('authToken');
    const expiresAt = localStorage.getItem('expiresAt');

    if (token && expiresAt && parseInt(expiresAt) > Date.now()) {
      this.loggedInSubject.next(true);
      this.router.navigate(['/dashboard']);
      this.startInactivityTimer();
    } else {
      this.loggedInSubject.next(false);
    }
  }

  isLoggedIn() {
    return this.loggedInSubject.asObservable();
  }

  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (username === 'admin' && password === 'password') {
        const authToken = 'some-token';
        const expiresAt = Date.now() + this.inactivityDuration * 1000;
        console.log('Expires At:', expiresAt);

        localStorage.setItem('authToken', authToken);
        localStorage.setItem('expiresAt', expiresAt.toString());

        this.loggedInSubject.next(true);
        this.startInactivityTimer();
        this.loggedIn = true;
        resolve(true);
      } else {
        this.loggedIn = false;
        reject(false);
      }
    });
  }

  logout() {
    console.log('Logging out...');
    localStorage.removeItem('authToken');
    localStorage.removeItem('expiresAt');
    this.stopInactivityTimer();
    this.router.navigate(['/login']);
    this.loggedInSubject.next(false);
  }

  private startInactivityTimer() {
    this.ngZone.runOutsideAngular(() => {
      this.stopInactivityTimer(); // Clear existing timers

      let timeLeft = this.inactivityDuration;
      console.log(`⏳ Inactivity timer started: ${timeLeft}s`);

      this.countdownInterval = setInterval(() => {
        timeLeft--;
        // console.log(`⌛ Time remaining: ${timeLeft}s`);
        if (timeLeft <= 0) {
          clearInterval(this.countdownInterval);
        }
      }, 1000);

      this.inactivityTimeout = setTimeout(() => {
        this.ngZone.run(() => {
          console.log('❗ User inactive. Auto-logging out...');
          // Show an alert before logging out
          window.alert('You have been logged out due to inactivity.');
          this.logout();
        });
      }, this.inactivityDuration * 1000);

      this.inactivitySubscription = this.activityEvents$.subscribe(() => {
        this.resetInactivityTimer();
      });
    });
  }

  private resetInactivityTimer() {
    clearTimeout(this.inactivityTimeout);
    clearInterval(this.countdownInterval);
    this.startInactivityTimer();
  }

  private stopInactivityTimer() {
    clearTimeout(this.inactivityTimeout);
    clearInterval(this.countdownInterval);
    if (this.inactivitySubscription) {
      this.inactivitySubscription.unsubscribe();
      this.inactivitySubscription = null;
    }
  }
}