import { Injectable } from '@angular/core';
import { Account, CardType } from '../models/account.model';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Expense } from '../models/expenses.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = environment.apiUrl + '/accounts';
  private accounts: Account[] = [];

  private accountsSubject = new BehaviorSubject<Account[]>(this.accounts);
  constructor(private http: HttpClient) {}

  loadAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl).pipe(
      map((accounts: Account[]) => {
        this.accountsSubject.next(this.accounts);
        return accounts;
      }),
      catchError(this.handleError('loadAllAccounts', []))
    );
  }

  addAccount(newAccount: Account): Observable<any> {
    return this.http.post<any>(this.apiUrl, newAccount).pipe(
      map(response => {
        this.accountsSubject.next(this.accounts);
        return response;
      }),
      catchError(this.handleError('addAccount'))
    );
  }

  updateAccounts(acc: Account[]): Observable<Account[]> {
    return this.http.put<Account[]>(this.apiUrl + '/updateAccounts', acc).pipe(
      map(updated => {
        return updated;
      }),
    );
  }

  deleteAccount(acc: Account): Observable<any>{
    const url = `${this.apiUrl}/${acc._id}`
    return this.http.delete<any>(url).pipe(
      map(() => {
        const index = this.accounts.findIndex(index => index._id === acc._id);
        return { success: true };
      }), 
      catchError(this.handleError('deleteAccount'))
    );
  }

  get accounts$(): Observable<Account[]> {
    return this.accountsSubject.asObservable();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
