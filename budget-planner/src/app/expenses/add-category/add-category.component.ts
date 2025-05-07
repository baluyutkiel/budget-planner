import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseCategory } from '../../models/expenses.model';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  categoryForm: FormGroup;
  newCategory: ExpenseCategory = {
    name: ''
  }
  constructor(
    private router: Router,
    private expenseService: ExpensesService
  ) {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    })
  }


  submitForm() {
    if (this.categoryForm?.valid) {
      const newCategory: ExpenseCategory = {
        name: this.categoryForm.get('name')?.value
      }
      
      this.expenseService.addExpenseCategories(newCategory).subscribe(
        response => {
          console.log('Categry Added:', response);
        }, 
        error => {
          console.error('Error Adding Category', error);
        }
      )
      this.router.navigate(['/expenses/expenses-overview']);
    }
  }

  cancel() {
    this.router.navigate(['/expenses/expenses-overview']);
  }
}
