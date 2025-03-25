import { Injectable } from '@angular/core';
import { Expense, ExpenseCategory, ExpenseType } from '../models/expenses.model';
import { Observable, of } from 'rxjs';
import { CardType } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  // private expenseList: Expense[] = [
  //   {
  //     name: 'Jollibee',
  //     date: new Date('March 22, 2025'),
  //     category: { name: 'Food' },
  //     account: new Account('assets/images/amex-logo.png', CardType.AMEX, 'AMEX', 1000, 0),
  //     expenseType: ExpenseType.NV,
  //     cost: 0
  //   }
  // ];
  private expenseList: Expense[] = [];

  private categoryList: ExpenseCategory[] = [
    {
      name: 'Food'
    },
    {
      name: 'Subscription'
    }
  ]
  constructor() { }

  getExpenseList() {
    return this.expenseList;
  }

  getExpenseCategories(): Observable<ExpenseCategory[]> {
    return of(Object.values(this.categoryList)); // Static data
  }

  addExpense(newExpense: Expense) {
    this.expenseList.push(newExpense);
  }

  getExpensesList(): Observable<Expense[]> {
    return of(Object.values(this.expenseList));
  }

}
