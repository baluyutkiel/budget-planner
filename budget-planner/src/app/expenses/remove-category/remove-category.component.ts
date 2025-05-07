import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseCategory } from '../../models/expenses.model';
import { ExpensesService } from '../../services/expenses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remove-category',
  templateUrl: './remove-category.component.html',
  styleUrl: './remove-category.component.scss'
})
export class RemoveCategoryComponent {
  categoryForm: FormGroup;
  expenseCategories: ExpenseCategory[] = [];

  constructor(private expenseService: ExpensesService, private router: Router) 
  {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.loadCategories();
  }

  cancel() {
    this.router.navigate(['expenses/expenses-overview']);
  }

  loadCategories() {
    this.expenseService.getExpenseCategories().subscribe(categories => {
      this.expenseCategories = categories;
    })
  }

  submitForm() {
    if (this.categoryForm.valid) {
      this.expenseService.deleteExpenseCategories(this.categoryForm.get('name')?.value).subscribe({
        next: (res) => {
          console.log('Category deleted.', res);
          this.router.navigate(['expenses/expenses-overview']);
        },
        error: (error) => {
          console.log('Error deleting category.');
        }
      });
    }
  }
}
