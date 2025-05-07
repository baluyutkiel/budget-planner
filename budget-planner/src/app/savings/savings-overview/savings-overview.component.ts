import { Component, OnDestroy, OnInit } from '@angular/core';
import { Account, CardType } from '../../models/account.model';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, map, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-savings-overview',
  templateUrl: './savings-overview.component.html',
  styleUrl: './savings-overview.component.scss'
})
export class SavingsOverviewComponent implements OnInit, OnDestroy {
  savingsAccounts: Account[] = [];
  loadAccount: boolean = false;
  selectedAccount: any
  debug: boolean = true;

  private $loadSavingsAccounts = new BehaviorSubject<boolean | null>(null);
  private $destroy = new Subject<void>();

  
  constructor(
    private accountService: AccountService, 
    private router: Router) {}

    ngOnInit(): void {
      this.$loadSavingsAccounts
        .pipe(
          filter(trigger => trigger !== null), 
          switchMap(() => this.accountService.loadAccounts()), 
          map(accounts => accounts.filter(acc => acc.cardType === CardType.SAVINGS)),
          takeUntil(this.$destroy) 
        )
        .subscribe(filtered => {
          this.savingsAccounts = filtered;
          if (this.debug) {
            console.log('Savings Account: ', this.savingsAccounts);
          }
        });
  
      this.$loadSavingsAccounts.next(true);
    }

    viewAccount(account: Account) {
      if (this.debug) {
        // console.log(account);
      }
      this.selectedAccount = account;
      this.loadAccount = !this.loadAccount;
    }
    
    ngOnDestroy(): void {
      this.savingsAccounts = [];
      if (this.debug) {
        console.log('Savings Account: ', this.savingsAccounts);
      }
      this.$destroy.next();
      this.$destroy.complete();
    }
}
