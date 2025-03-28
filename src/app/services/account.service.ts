import { Injectable } from '@angular/core';
import { Account, CardType } from '../models/account.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Expense } from '../models/expenses.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts: Account[] = [
    {
      logo: 'assets/images/amex-logo.png',
      cardType: CardType.AMEX,
      bankName: 'AMEX',
      limit: 1000,
      balance: 0
    },
    {
      logo: 'assets/images/mastercard-logo-2.png',
      cardType: CardType.MASTERCARD,
      bankName: 'Triangle',
      limit: 1500,
      balance: 0
    },
    {
      logo: 'assets/images/visa-logo.png',
      cardType: CardType.VISA,
      bankName: 'RBC',
      limit: 400,
      balance: 0
    },
  ];

  private accountsSubject = new BehaviorSubject<Account[]>(this.accounts);
  constructor() {}

  getAllAccounts(): Observable<Account[]> {
    return of(Object.values(this.accounts));
  }

  addAccount(newAccount: Account) {
    this.accounts.push(newAccount);
  }
  
  updateBalance(exp: Expense) {
    const matchedAccount = this.accounts.find(x => x.bankName === exp.account?.bankName && x.cardType === exp.account.cardType);
    if (matchedAccount) {
      matchedAccount.limit -= exp.cost;
      matchedAccount.balance += exp.cost;
      console.log('Balance Left:' + matchedAccount.balance);
    } else {
      console.log("No Matching Account Found.");
    }
  }

  deleteAccount(acc: Account) {
    let index = this.accounts.findIndex(x => x.bankName == acc.bankName && x.cardType && acc.cardType);
    if (index > -1) {
      this.accounts.splice(index, 1);
      console.log(this.accounts);
    }
  }

  get accounts$(): Observable<Account[]> {
    return this.accountsSubject.asObservable();
  }
}
