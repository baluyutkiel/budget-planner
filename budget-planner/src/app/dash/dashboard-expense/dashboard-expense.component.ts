import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, filter, switchMap } from 'rxjs';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-dashboard-expense',
  templateUrl: './dashboard-expense.component.html',
  styleUrls: ['./dashboard-expense.component.scss']
})
export class DashboardExpenseComponent implements OnInit, OnDestroy {
  private $loadTotalExpense = new BehaviorSubject<boolean | null>(null);

  totalExpense: number = 0;
  selectedMonth: number = new Date().getMonth();
  income: number = 2100;

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(private expenseService: ExpensesService) {}

  ngOnInit() {
    this.loadExpenseForMonth(this.selectedMonth);

    this.$loadTotalExpense.pipe(
      filter(shouldLoad => shouldLoad === true),
      switchMap(() => {
        const month = this.selectedMonth + 1; 
        const year = new Date().getFullYear(); 
        return this.expenseService.getMonthlyTotal(month, year);
      })
    ).subscribe(total => {
      this.totalExpense = total;
    });
  }

  ngOnDestroy() {
    this.$loadTotalExpense.complete();
  }

  getCurrentMonthName() {
    return this.months[this.selectedMonth];
  }

  onMonthChange(event: any) {
    this.selectedMonth = parseInt(event.target.value, 10);
    console.log('Selected month:', this.months[this.selectedMonth]);
    this.loadExpenseForMonth(this.selectedMonth);
  }

  loadExpenseForMonth(month: number) {
    this.$loadTotalExpense.next(true);
  }

  getSavings() {
    return this.income - this.totalExpense;
  }
}