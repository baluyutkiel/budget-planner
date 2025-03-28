import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AddAccountComponent } from './account/add-account/add-account.component';
import { ExpensesOverviewComponent } from './expenses/expenses-overview/expenses-overview.component';
import { AddExpenseComponent } from './expenses/add-expense/add-expense.component';
import { AddCategoryComponent } from './expenses/add-category/add-category.component';
import { RemoveCategoryComponent } from './expenses/remove-category/remove-category.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'accounts', component: AccountsComponent},
  { path: 'accounts/add-account', component: AddAccountComponent},
  { path: 'expenses/expenses-overview', component: ExpensesOverviewComponent},
  { path: 'expenses/add-expense', component: AddExpenseComponent},
  { path: 'expenses/add-category', component: AddCategoryComponent },
  { path: 'expenses/remove-category', component: RemoveCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
