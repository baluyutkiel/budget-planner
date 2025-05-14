import { Injectable } from '@angular/core';
import { Expense, ExpenseCategory, ExpenseType } from '../models/expenses.model';
import { catchError, map, Observable, of } from 'rxjs';
import { CardType } from '../models/account.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private apiCategory = environment.apiUrl + '/category';
  private apiExpense = environment.apiUrl + '/expense';

  private expenseList: Expense[] = [];

  private categoryList: ExpenseCategory[] = [];
  constructor(private http: HttpClient) { }

  getExpenseList() {
    return this.expenseList;
  }

  addExpense(newExpense: Expense) {
    // this.expenseList.push(newExpense);
    return this.http.post<any>(this.apiExpense, newExpense).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError('Error Adding Expense'))
    ); 
  }

  getExpensesList(): Observable<Expense[]> {
    return of(Object.values(this.expenseList));
  }
  
  getExpenseCategories(): Observable<ExpenseCategory[]> {
    // return of(Object.values(this.categoryList));
    return this.http.get<ExpenseCategory[]>(this.apiCategory).pipe(
      map((category: ExpenseCategory[]) => {
        return category;
      }),
      catchError(this.handleError('Error Loading Categories', []))
    );
  }

  addExpenseCategories(newCategory: ExpenseCategory) {
    // this.categoryList.push(newCategory);
    return this.http.post<any>(this.apiCategory, newCategory).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError('Error Adding Categories'))
    );
  }

  deleteExpenseCategories(category: ExpenseCategory) {
    const url = `${this.apiCategory}/${category._id}`
    return this.http.delete<any>(url).pipe(
      map(() => {
        const index = this.categoryList.findIndex(index => index._id === category?._id);
        return { success: true };
      }),
      catchError(this.handleError('Category has been deleted.'))
    );
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
        const bankNameMatch = exp.bankName?.toLowerCase().includes(searchTerm);

        return nameMatch || categoryMatch || bankNameMatch;
      });
    }
    return of(filteredExpenses);
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiExpense).pipe(
      map(response => {
        this.expenseList = response;
        return response;
      }),
      catchError(this.handleError('Error Loading Expenses.', []))
    );
  }

  deleteExpenses(selectedExpenses: Expense[]): Observable<void> {
    const expenseIdsToDelete = selectedExpenses.map(expense => expense._id);
  
    return this.http.request<void>('DELETE', this.apiExpense, {
      body: { ids: expenseIdsToDelete },
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map(() => {
        this.expenseList = this.expenseList.filter(exp => !expenseIdsToDelete.includes(exp._id));
      }),
      catchError((error) => {
        console.error('Error deleting expenses:', error);
        return of();
      })
    );
  }

  getMonthlyTotal(month: number, year: number): Observable<number> {
    const url = `${this.apiExpense}/total?month=${month}&year=${year}`;
    return this.http.get<{ totalExpense: number }>(url).pipe(
      map(response => response.totalExpense),
      catchError(this.handleError<number>('Error fetching monthly total', 0))
    );
  }

  getUpcomingVariableExpenses(): Observable<Expense[]> {
    const url = `${this.apiExpense}/non-variable-expenses/upcoming`;
    return this.http.get<Expense[]>(url).pipe(
      map((expenses: Expense[]) => expenses),
      catchError(this.handleError<Expense[]>('Error fetching upcoming variable expenses', []))
    );
  }

  getRecentExpenses(): Observable<Expense[]> {
    const url = `${this.apiExpense}/recent`;
    return this.http.get<Expense[]>(url).pipe(
      map((expenses: Expense[]) => expenses),
      catchError(this.handleError<Expense[]>('Error fetching recent transactions', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
