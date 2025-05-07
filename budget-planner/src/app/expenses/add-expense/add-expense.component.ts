import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expense, ExpenseType, ExpenseCategory } from '../../models/expenses.model';
import { Router } from '@angular/router';
import { ExpensesService } from '../../services/expenses.service';
import { Account } from '../../models/account.model';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent {
  expenseForm: FormGroup;
  expenseTypes = Object.values(ExpenseType);
  accountList: Account[] = [];
  expenseCategories: ExpenseCategory[] = [];
  
  constructor(
    private router: Router,
    private expenseService: ExpensesService,
    private accountService: AccountService) {
    this.expenseForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      date: new FormControl(new Date(), [Validators.required]),
      category: new FormControl('', [Validators.required]),
      account: new FormControl('', [Validators.required]),
      expenseType: new FormControl(ExpenseType.NV, [Validators.required]),
      cost: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.loadAccounts();
    this.loadExpenseCategories();
  }

  loadExpenseCategories() {
    this.expenseService.getExpenseCategories().subscribe(categories => {
      this.expenseCategories = categories;
    });
  }

  loadAccounts() {
    this.accountService.loadAccounts().subscribe(account => {
      this.accountList = account;
    });
  }
  
  cancel() {
    this.router.navigate(['expenses/expenses-overview']);
  }

  getExpenseType(expenseType: ExpenseType): ExpenseType {
    let ep: ExpenseType
    
    if (expenseType === ExpenseType.NV) {
      ep = ExpenseType.NV;
    } else {
      ep = ExpenseType.V;
    } 
    
    return ep;
  }

  submitForm() {
    if (this.expenseForm.valid) {
      const account = this.expenseForm.get('account')?.value;
      
      const newExpense: Expense = {
        name: this.expenseForm.get('name')?.value,
        date: new Date(this.expenseForm.get('date')?.value) || new Date(),
        category: this.expenseForm.get('category')?.value,
        bankID: account._id,
        bankName: account.name,
        expenseType: this.getExpenseType(this.expenseForm.get('expenseType')?.value),
        cost: this.expenseForm.get('cost')?.value || 0,
        selected: false
      };

      let index = this.accountList.findIndex(index => index._id === account._id);
      if (index !== -1) {
        this.accountList[index].balance += newExpense.cost;
        this.onUpdateAccounts(this.accountList);
        this.onAddExpense(newExpense);
      }
    }
  }

  onAddExpense(exp: Expense) {
    this.expenseService.addExpense(exp).subscribe(
      response => {
        console.log('Expense Added:', response);
      },
      error => {
        console.error('Error Adding Expense', error);
      }
    )
  }

  onUpdateAccounts(acc: Account[]) {
    this.accountService.updateAccounts(acc).subscribe({
      next: (updatedAccount) => {
        console.log('Account updated successfully:', updatedAccount);
        this.router.navigate(['/expenses/expenses-overview']);
      },
      error: (error) => {
        console.error('Failed to update account:', error);
      }
    });
  }
}

