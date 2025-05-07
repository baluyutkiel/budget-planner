import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<boolean>();
  constructor(public authService: AuthService) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggle.emit(this.isCollapsed);
  }

  logout() {
    this.authService.logout();
  }
}
