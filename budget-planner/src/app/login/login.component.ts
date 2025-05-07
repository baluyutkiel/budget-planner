import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        localStorage.setItem('token', response.token);  // todo: response.token is undefined here. Update with JWT token
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password';
      },
    });
  }
}
