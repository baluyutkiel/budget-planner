import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Account, CardType } from '../../models/account.model';
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

  expenseType = ['All', ...Object.values(ExpenseType)];
  filteredExpenseList: Expense[] = [];
  accounts: Account[] = [];
  
  searchTerm: string = '';
  selectedFilter: string = 'All';
  
  constructor (
    private accountService: AccountService,
    private expenseService: ExpensesService,
    private router: Router) {
  }

  ngOnInit() {
    this.loadExpenses();
    this.loadAccounts();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe(exp => {
      this.filteredExpenseList = exp;
    })
  }

  onFilterExpenses(type: string) {
    this.selectedFilter = type;
    this.filter();
  }

  onSearchTermChange(event: any) {
    this.searchTerm = event;
    this.filter();
  }

  filter() {
    this.expenseService.filterExpenses(this.selectedFilter, this.searchTerm).subscribe(filtered => {
      this.filteredExpenseList = filtered;
    });
  }

  loadAccounts() {
    this.accountService.loadAccounts().subscribe(acc => {
      this.accounts = acc;
    });
  }

  toggleSelectAll(event: any) {
    const isSelected = event.target.checked;
    this.filteredExpenseList.forEach(expense => {
      expense.selected = isSelected; 
    });
    console.log(this.filteredExpenseList);
  }
  
  isAllSelected() {
    if (this.filteredExpenseList.length === 0) {
      return false;
    }
    return this.filteredExpenseList.every(exp => exp.selected);
  }
  
  onSelect(expense: Expense, event: any) {
    expense.selected = event.target.checked; 
  }

  deleteSelectedExpenses() {
    if (this.filteredExpenseList.filter(exp => exp.selected).length > 0) {
      let selectedExpenses = this.updateBalance(this.filteredExpenseList.filter(exp => exp.selected));

      this.expenseService.deleteExpenses(selectedExpenses).subscribe({
        next: (res) => {
          console.log('Expenses deleted', res);
          this.updateAccount(this.accounts);
          this.loadExpenses();
        },
        error: (error) => {
          console.log('Error deleting expenses', error);
        }
      });
    }
  }

  updateBalance(exp: Expense[]): Expense[] {
    const expenses = exp;
    expenses.forEach(ex => {
      let index = this.accounts.findIndex(x => x?._id === ex.bankID);
      if (index > -1) {
        this.accounts[index].balance -= ex.cost;
      }
    })

    return expenses;
  }

  updateAccount(acc: Account[]) {
    this.accountService.updateAccounts(acc).subscribe({
      next: (updatedAccount) => {
        console.log('Account has been updated', updatedAccount);
      },
      error: (error) => {
        console.log('Failed to update account', error);
      }
    });
  }
  
  hasSelectedExpenses(): boolean {
    return this.filteredExpenseList.some(exp => exp.selected);
  }

  onAddExpense() {
    this.router.navigate(['/expenses/add-expense']);
  }

  onAddCategory() {
    this.router.navigate(['/expenses/add-category']);
  }

  onRemoveCategory() {
    this.router.navigate(['/expenses/remove-category']);
  }
}
