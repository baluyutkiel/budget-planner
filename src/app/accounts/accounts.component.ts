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
  }

  loadAccount() {
    this.accountService.getAccounts().subscribe(account => {
      this.accounts = account;
    });
    this,console.log(this.accounts);
  }

  onAddAccount() {
    this.router.navigate(['/accounts/add-account']);
  }

  // todo: create a function in AccountService to delete this
  deleteAccount(index: number): void {
    this.accounts.splice(index, 1);
  }
  
}
