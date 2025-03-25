import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardType } from '../../models/account.model';
import { AccountService } from '../../services/account.service';
import { Expense, ExpenseType } from '../../models/expenses.model';
import { ExpensesService } from '../../services/expenses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses-overview',
  templateUrl: './expenses-overview.component.html',
  styleUrl: './expenses-overview.component.scss'
})
export class ExpensesOverviewComponent {

  form: FormGroup;
  expenseType = ['All', ...Object.values(ExpenseType)];
  expenseList: Expense[] = [];
  filteredExpenseList: Expense[] = [];
  constructor (
    private accountService: AccountService,
    private expenseService: ExpensesService,
    private router: Router) {
    this.form = new FormGroup ({
      expenseType: new FormControl('All', [Validators.required])
    });
  }

  ngOnInit() {
    this.expenseService.getExpensesList().subscribe(x => {
      this.expenseList = x;
      this.filterExpenses();
    });

    this.form.get('expenseType')?.valueChanges.subscribe(() => {
      this.filterExpenses();
    });
  }

  filterExpenses() {
    const selectedExpenseType = this.form.get('expenseType')?.value;
    console.log(selectedExpenseType);
    if (selectedExpenseType === 'Variable Expense') {
      this.filteredExpenseList = this.expenseList.filter(exp => exp.expenseType === ExpenseType.V);
    } else if (selectedExpenseType === 'Non-Variable Expense') {
      this.filteredExpenseList = this.expenseList.filter(exp => exp.expenseType === ExpenseType.NV);
    } else {
      this.filteredExpenseList = this.expenseList;  // Show all expenses if no type is selected
    }
  }

  onAddExpense() {
    this.router.navigate(['/expenses/add-expense']);
  }
}
