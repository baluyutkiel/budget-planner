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
    this.loadAccount();

    this.accountService.accounts$.subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  loadAccount() {
    this.accountService.getAllAccounts().subscribe(account => {
      this.accounts = account;
    });
    console.log(this.accounts);
  }

  onAddAccount() {
    this.router.navigate(['/accounts/add-account']);
  }

  deleteAccount(acc: Account): void {
    this.accountService.deleteAccount(acc);
  }
  
}
