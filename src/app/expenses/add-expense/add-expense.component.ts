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
  newExpenseForm: Expense = {
    name: '',
    date: new Date(),
    category: { name: 'Food' },
    account: null,
    expenseType: ExpenseType.NV,
    cost: 0
  }
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
    this.loadExpenseCategories();
    this.loadAccountList();
  }

  loadExpenseCategories() {
    this.expenseService.getExpenseCategories().subscribe(categories => {
      this.expenseCategories = categories;
    });
  }

  loadAccountList() {
    this.accountService.getAccounts().subscribe(account => {
      this.accountList = account;
    });
  }
  
  cancel() {
    this.router.navigate(['expenses/expenses-overview']);
  }

    submitForm() {
      if (this.expenseForm.valid) {
        const selectedExpenseType = this.expenseForm.get('expenseType')?.value;
        let expenseType: ExpenseType;

        if (selectedExpenseType === ExpenseType.NV) {
          expenseType = ExpenseType.NV;
        } else if (selectedExpenseType === ExpenseType.V) {
          expenseType = ExpenseType.V;
        } else {
          expenseType = ExpenseType.NV; // Default to NV if invalid
        }    
        const newExpense: Expense = {
          name: this.expenseForm.get('name')?.value,
          date: this.expenseForm.get('date')?.value || new Date(),
          category: this.expenseForm.get('category')?.value,
          account: this.expenseForm.get('account')?.value,
          expenseType: expenseType,
          cost: this.expenseForm.get('cost')?.value || 0
        };
    
        console.log('New Expense:', newExpense);
        this.expenseService.addExpense(newExpense)
        //todo add filering logic for variable expense/nv expense
        this.router.navigate(['/expenses/expenses-overview']);
      }
    }
}

