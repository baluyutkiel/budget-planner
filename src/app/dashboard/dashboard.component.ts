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

  constructor(private accountService: AccountService) {}

  ngOnInit() {
  }

  loadAccount() {
    this.accountService.getAccounts().subscribe(account => {
      this.accounts = account;
    });
  }
}
