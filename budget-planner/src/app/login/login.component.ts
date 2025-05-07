import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loginFailed: boolean = true;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;

      // if (this.isLoggedIn) {
      //   this.router.navigate(['/dashboard']);
      // }
    });  
  }

  async login() {
    try {
      const success = await this.authService.login(this.username, this.password);
      if (success) {
        console.log('Login successful');
        this.loginFailed = true;
        this.router.navigate(['/dashboard']);
      } else {
        this.loginFailed = false;
        this.errorMessage = 'Invalid username or password';
      }
    } catch (error) {
      this.loginFailed = false;
      this.errorMessage = 'An error occurred while logging in';
    }
  }
}
