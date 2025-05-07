import { Component } from '@angular/core';
import { Account } from '../models/account.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  accounts: Account[] = [];
  currentTime = new Date();
  currentUser: String = 'Kiel';
  selectedMonth: Date | null = null;



  constructor(private accountService: AccountService) {}

  ngOnInit() {}

  ngOnDestroy() {}

  getGreeting(): string {
    const currentTime = new Date().getHours();

    if (currentTime) {
      return `Hello ${this.currentUser}, Good Morning`;
    } else if (currentTime < 18) {
      return `Hello ${this.currentUser}, Good Afternoon`;
    } else {
      return `Hello ${this.currentUser}, Good Evening`;
    }
  }

    // Handle the selection of a month
    onMonthSelected(event: any): void {
      this.selectedMonth = event; // You can format the event to display the selected month
      console.log('Selected month:', this.selectedMonth);
    }
}
