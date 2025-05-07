import { Component, Input, input } from '@angular/core';
import { Account } from '../../models/account.model';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, filter, Subject, switchMap, takeUntil } from 'rxjs';
import { SavingsActivity } from '../../models/savings.model';
import { SavingsService } from '../../services/savings.service';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-savings-activity',
  templateUrl: './savings-activity.component.html',
  styleUrl: './savings-activity.component.scss'
})
export class SavingsActivityComponent {
  debug: boolean = true;
  savingsTransactionList: Account[] = [];
  savingsActivity: SavingsActivity[] = [];

  private $loadSavingsTransactions = new BehaviorSubject<boolean | null>(null);

  private $destroy = new Subject<void>;
  @Input() account!: Account;

  constructor(
    private route: Router,
    private savingsService: SavingsService) {}

  ngOnInit(): void  {
    this.$loadSavingsTransactions
      .pipe(
        filter(trigger => trigger !== null),
        switchMap(() => this.savingsService.loadSavingsTransactionsBankID(this.account._id!)),
        takeUntil(this.$destroy)
      )
      .subscribe(filtered => {
        this.savingsActivity = filtered;
        console.log('Test', this.savingsActivity);
      });

    this.$loadSavingsTransactions.next(true);
  }
  
  onAddMoney() {
    if (this.debug) {
      console.log('Add Money');
      console.log(this.account);
    }
    this.route.navigate(['/savings/savings-transactions'], { state: { account: this.account }});
  }

  onMoveMoney() {
    if (this.debug) {
      console.log('Move Money');
    }
    if (this.account._id) {
      this.route.navigate(['/savings/savings-move-money', this.account._id]);
    }
  }

  loadAccount() {
    console.log(this.account);
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
