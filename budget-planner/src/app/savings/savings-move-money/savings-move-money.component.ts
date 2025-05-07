import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../models/account.model';
import { AccountService } from '../../services/account.service';
import { BehaviorSubject, catchError, filter, map, of, Subject, switchMap, takeUntil } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SavingsActivity } from '../../models/savings.model';
import { SavingsService } from '../../services/savings.service';

@Component({
  selector: 'app-savings-move-money',
  templateUrl: './savings-move-money.component.html',
  styleUrl: './savings-move-money.component.scss'
})
export class SavingsMoveMoneyComponent {
  debug: boolean = true;
  accountId: string | null = null;
  savingsForm: FormGroup;

  accounts: Account[] = [];

  private $loadAccounts = new BehaviorSubject<boolean | null>(null);
  private $updateAccounts = new BehaviorSubject<Account[] | null>(null);
  private $addMoney = new BehaviorSubject<SavingsActivity | null>(null);

  private $destroy = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountServices: AccountService,
    private savingsService: SavingsService) {
      this.savingsForm = new FormGroup({
        date: new FormControl(new Date(), [Validators.required]),
        account: new FormControl('', [Validators.required]),        
        name: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required, Validators.min(1)]),
        description: new FormControl('', [Validators.required])
      });
    }

  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('id');
    if (this.debug) {
      console.log('AccountID: ', this.accountId);
    }

    this.$loadAccounts 
      .pipe(
        filter(trigger => trigger !== null),
        switchMap(() => this.accountServices.loadAccounts()),
        // map(accounts => accounts.filter(acc => acc._id !== this.accountId)),
        takeUntil(this.$destroy)
      )
      .subscribe(filtered => {
        this.accounts = filtered;
        if (this.debug) {
          console.log('Accounts', this.accounts);
        }
      });

    this.$updateAccounts
    .pipe(
      filter((accounts): accounts is Account[] => accounts !== null),
      switchMap(accounts =>
        this.accountServices.updateAccounts(accounts).pipe(
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

    this.$loadAccounts.next(true);
  }

  submitForm() {
    if (this.savingsForm.valid) {
      const account = this.savingsForm.get('account')?.value;

      const moveMoney: SavingsActivity = {
        bankID: account._id,
        date: new Date(this.savingsForm.get('date')?.value || new Date()),
        name: this.savingsForm.get('name')?.value,
        amount: this.savingsForm.get('amount')?.value || 0,
        description: this.savingsForm.get('description')?.value
      }
      let toIndex = this.accounts.findIndex(x => x._id === account?._id);
      let fromIndex = this.accounts.findIndex(x => x._id === this.accountId);
      
      if (toIndex !== -1 && fromIndex !== -1) {
        this.accounts[toIndex].balance += moveMoney.amount;
        this.accounts[fromIndex].balance -= moveMoney.amount; 
        this.$updateAccounts.next(this.accounts);
        this.$addMoney.next(moveMoney);
      }
    }
  }

  onCancel() {
    this.router.navigate(['savings/savings-overview'])
  }

  getAccounts(): Account[] {
    // excludes origin of transfer
    return this.accounts.filter(x => x._id !== this.accountId);
  }

  getOriginAccount(): Account | null {
    return this.accounts.find(x => x._id === this.accountId) || null;
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
