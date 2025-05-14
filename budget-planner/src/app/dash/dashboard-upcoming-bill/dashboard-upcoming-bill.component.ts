import { Component } from '@angular/core';
import { Expense } from '../../models/expenses.model';
import { ExpensesService } from '../../services/expenses.service';
import { BehaviorSubject, filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard-upcoming-bill',
  templateUrl: './dashboard-upcoming-bill.component.html',
  styleUrl: './dashboard-upcoming-bill.component.scss'
})
export class DashboardUpcomingBillComponent {
  upcomingBills = [
    { name: 'Internet', dueDate: new Date(2025, 4, 15), amount: 80, paid: false },
    { name: 'Electricity', dueDate: new Date(2025, 4, 20), amount: 120.5, paid: true },
    { name: 'Phone', dueDate: new Date(2025, 4, 25), amount: 60, paid: false },
  ];

  expenseList: Expense[] = [];
  private $loadExpenseList = new BehaviorSubject<boolean | null>(null);
  
  constructor(private expenseService: ExpensesService) {}

  ngOnInit() {
    this.$loadExpenseList.pipe(
      filter(load => load === true),
      switchMap(() => this.expenseService.getUpcomingVariableExpenses())
    ).subscribe({
      next: (expenses) => {
        this.expenseList = expenses;
        console.log('Upcoming variable expenses:', this.expenseList);
      },
      error: (err) => {
        console.error('Failed to load upcoming variable expenses', err);
      }
    });

    this.$loadExpenseList.next(true);
  }

  ngOnDestroy() {}
}
