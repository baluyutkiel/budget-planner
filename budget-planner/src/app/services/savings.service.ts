import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SavingsActivity } from '../models/savings.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavingsService {
  private apiUrl = environment.apiUrl + '/savings';
  private savingsTransactions: SavingsActivity[] = [];

  constructor(private http: HttpClient) { }

  addSavings(newSavings: SavingsActivity): Observable<any> {
    return this.http.post<any>(this.apiUrl, newSavings).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError('addSavings'))
    );
  }

  loadSavingsTransactions(): Observable<SavingsActivity[]> {
    return this.http.get<SavingsActivity[]>(this.apiUrl).pipe(
      map((savings: SavingsActivity[]) => {
        return savings;
      }),
      catchError(this.handleError('load savings transactions', []))
    );
  }

  loadSavingsTransactionsBankID(bankID: string): Observable<SavingsActivity[]> {
    return this.http.get<SavingsActivity[]>(`${this.apiUrl}/${bankID}`).pipe(
      map((savings: SavingsActivity[]) => savings),
      catchError(this.handleError('load savings transactions', []))
    );
  }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
}
