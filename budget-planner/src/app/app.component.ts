import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'budget-planner';
  isSidebarCollapsed: boolean = false;
  isLoggedIn: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });  
  }

  onSidebarToggle(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}