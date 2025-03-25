import { Injectable } from '@angular/core';
import { Account, CardType } from '../models/account.model';
import { Observable, of } from 'rxjs';


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

  constructor() {}

  getAccounts(): Observable<Account[]> {
    return of(Object.values(this.accounts)); // Static data
  }

  addAccount(newAccount: Account) {
    this.accounts.push(newAccount);
  }
  
  // getAccountNames() {
  //   let bankNames: string[] = [];
  //   this.accounts.forEach(account => bankNames.push(account.bankName + ' - ' + account.cardType));
  //   return bankNames
  // }
}
