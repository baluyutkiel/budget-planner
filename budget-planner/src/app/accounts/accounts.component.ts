import { Component } from '@angular/core';
import { Account } from '../models/account.model';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent {
  accounts: Account[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router) {}

  ngOnInit() {
    this.loadAccounts();
  }

  onAddAccount() {
    this.router.navigate(['/accounts/add-account']);
  }

  loadAccounts() {
    this.accountService.loadAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  deleteAccount(acc: Account): void {
    this.accountService.deleteAccount(acc).subscribe({
      next: (res) => {
        console.log('Account Successfully Deleted', res);
        this.loadAccounts();
      },
      error: (err) => {
        console.log('Error deleting account', err);
      }
    })
  }
  
}
