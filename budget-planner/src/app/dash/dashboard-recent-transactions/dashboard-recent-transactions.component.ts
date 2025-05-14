import { Component } from '@angular/core';
import { BehaviorSubject, filter, Subject, switchMap, takeUntil } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../models/expenses.model';

@Component({
  selector: 'app-dashboard-recent-transactions',
  templateUrl: './dashboard-recent-transactions.component.html',
  styleUrl: './dashboard-recent-transactions.component.scss'
})
export class DashboardRecentTransactionsComponent {
  private $loadRecentTransactions = new BehaviorSubject<boolean | null>(null);
  private $destroy = new Subject<void>();

  recentTransaction: Expense[] = [];

  constructor(private expenseService: ExpensesService) {}

  ngOnInit() {
    this.$loadRecentTransactions
      .pipe(
        filter((load) => load === true),
        switchMap(() => this.expenseService.getRecentExpenses()),
        takeUntil(this.$destroy)
      )
      .subscribe((transactions) => {
        this.recentTransaction = transactions;
        console.log('Recent Transactions:', this.recentTransaction);
      });

    this.$loadRecentTransactions.next(true);
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
