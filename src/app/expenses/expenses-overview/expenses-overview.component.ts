import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
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
  searchTermControl = new FormControl('');
  searchTerm: string = '';
  constructor (
    private accountService: AccountService,
    private expenseService: ExpensesService,
    private router: Router) {
    this.form = new FormGroup ({
      expenseType: new FormControl('All', [Validators.required]),
    });
  }

  ngOnInit() {
    this.loadFilteredExpenses();

    this.form.get('expenseType')?.valueChanges.subscribe(() => {
      this.loadFilteredExpenses();
    });
  }

  loadFilteredExpenses() {
    const expenseType = this.form.get('expenseType')?.value;
    this.expenseService.filterExpenses(expenseType, this.searchTerm).subscribe(filteredExpenses => {
      this.filteredExpenseList = filteredExpenses;
    });
  }

  onSearchTermChange(event: any) {
    this.searchTerm = event;
    this.loadFilteredExpenses();
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
    const selectedExpenses = this.filteredExpenseList.filter(exp => exp.selected);
  
    if (selectedExpenses.length > 0) {
      this.expenseService.removeSelectedExpenses(selectedExpenses);
      
      this.expenseService.getExpensesList().subscribe(expenses => {
        this.filteredExpenseList = expenses;
      });
    }
  }
  
  hasSelectedExpenses(): boolean {
    return this.filteredExpenseList.some(exp => exp.selected);
  }
}
