import { Injectable } from '@angular/core';
import { Expense, ExpenseCategory, ExpenseType } from '../models/expenses.model';
import { Observable, of } from 'rxjs';
import { CardType } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private expenseList: Expense[] = [];

  private categoryList: ExpenseCategory[] = [];
  constructor() { }

  getExpenseList() {
    return this.expenseList;
  }

  addExpense(newExpense: Expense) {
    this.expenseList.push(newExpense);
  }

  getExpensesList(): Observable<Expense[]> {
    return of(Object.values(this.expenseList));
  }
  
  getExpenseCategories(): Observable<ExpenseCategory[]> {
    return of(Object.values(this.categoryList));
  }

  addExpenseCategories(newCategory: ExpenseCategory) {
    this.categoryList.push(newCategory);
  }

  removeExpenseCategories(category: ExpenseCategory) {
    let index = this.categoryList.findIndex(cat => cat.name === category.name);
    if (index > -1) {
      this.categoryList.splice(index, 1);
    }
  }

  filterExpenses(expenseType: string, searchTerm: string): Observable<Expense[]> {
    let filteredExpenses = this.expenseList;

    switch (expenseType) {
      case 'Variable Expense':
        filteredExpenses = filteredExpenses.filter(exp => exp.expenseType === ExpenseType.V);
        break;
      case 'Non-Variable Expense':
        filteredExpenses = filteredExpenses.filter(exp => exp.expenseType === ExpenseType.NV);
        break;
      default:
        filteredExpenses = this.expenseList;
        break;
    }

    if (searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      filteredExpenses = filteredExpenses.filter(exp => {
        const nameMatch = exp.name?.toLowerCase().includes(searchTerm);
        const categoryMatch = exp.category?.name?.toLowerCase().includes(searchTerm);
        const bankNameMatch = exp.account?.bankName?.toLowerCase().includes(searchTerm);

        return nameMatch || categoryMatch || bankNameMatch;
      });
    }
    return of(filteredExpenses);
  }

  removeSelectedExpenses(selectedExpenses: Expense[]) {
    this.expenseList = this.expenseList.filter(exp => 
      !selectedExpenses.some(sel => sel.name === exp.name && sel.date === exp.date)
    );
  }
}
