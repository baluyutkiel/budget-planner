import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { SavingsActivity } from '../../models/savings.model';
import { AccountService } from '../../services/account.service';
import { BehaviorSubject, catchError, filter, map, of, Subject, switchMap, takeUntil } from 'rxjs';
import { SavingsService } from '../../services/savings.service';

@Component({
  selector: 'app-savings-transactions',
  templateUrl: './savings-transactions.component.html',
  styleUrl: './savings-transactions.component.scss'
})
export class SavingsTransactionsComponent {
  savingsForm: FormGroup;
  accountList: Account[] = [];

  private $updateAccounts = new BehaviorSubject<Account[] | null>(null);
  private $addMoney = new BehaviorSubject<SavingsActivity | null>(null);

  private $destroy = new Subject<void>();

  constructor(
    private router: Router, 
    private accountService: AccountService,
    private savingsService: SavingsService) {
    this.savingsForm = new FormGroup({
      date: new FormControl(new Date(), [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      amount: new FormControl('', [Validators.required, Validators.min(0)]),
      description: new FormControl('', [Validators.required, Validators.minLength(1)])
    });

    const nav = this.router.getCurrentNavigation();
    const account = nav?.extras.state?.['account'] as Account | undefined;
    
    if (account) {
      this.accountList.push(account);
    } else {
      console.warn('No account data found in navigation state.');
    }
  }

  ngOnInit() {
    this.$updateAccounts
    .pipe(
      filter((accounts): accounts is Account[] => accounts !== null),
      switchMap(accounts =>
        this.accountService.updateAccounts(accounts).pipe(
          map(updated => ({ success: true, updated })),
          catchError(error => {
            console.error('Failed to update account:', error);
            return of({ success: false });
          })
        )
      ),
      takeUntil(this.$destroy)
    ).subscribe(result => {
      if (result.success) {
        console.log('Account updated successfully:');
        this.router.navigate(['/savings/savings-overview']);
      }
    });

    this.$addMoney
    .pipe(
      filter((activity): activity is SavingsActivity => activity !== null),
      takeUntil(this.$destroy)
    ).subscribe((activity) => {
      this.savingsService.addSavings(activity).subscribe({
        next: () => console.log('Savings added successfully!'),
        error: (err) => console.error('Error saving data:', err),
      });
    });
  }

  ngOnDestroy() {
    this.accountList = [];
    this.$destroy.next();
    this.$destroy.complete();
  }

  onCancel() {
    this.router.navigate(['savings/savings-overview'])
  }

  submitForm() {
    if (this.savingsForm.valid) {
      let account = this.accountList[0];
      console.log(account)
      const newSavings: SavingsActivity = {
        bankID: account?._id,
        date: new Date(this.savingsForm.get('date')?.value || new Date()),
        name: this.savingsForm.get('name')?.value,
        amount: this.savingsForm.get('amount')?.value || 0,
        description: this.savingsForm.get('description')?.value
      };

      let index = this.accountList.findIndex(x => x?._id === newSavings?.bankID);
      if (index !== -1) {
        this.accountList[index].balance += newSavings.amount;
        this.$updateAccounts.next(this.accountList);
        this.$addMoney.next(newSavings);
      }
    }
  }
}
