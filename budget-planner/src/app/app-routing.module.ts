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
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { MainComponent } from './main/main.component';
import { SavingsOverviewComponent } from './savings/savings-overview/savings-overview.component';
import { SavingsActivityComponent } from './savings/savings-activity/savings-activity.component';
import { SavingsTransactionsComponent } from './savings/savings-transactions/savings-transactions.component';
import { SavingsMoveMoneyComponent } from './savings/savings-move-money/savings-move-money.component';
import { DashboardExpenseComponent } from './dash/dashboard-expense/dashboard-expense.component';
import { DashboardUpcomingBillComponent } from './dash/dashboard-upcoming-bill/dashboard-upcoming-bill.component';
import { DashboardRecentTransactionsComponent } from './dash/dashboard-recent-transactions/dashboard-recent-transactions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: 'accounts/add-account', component: AddAccountComponent },
      { path: 'expenses/expenses-overview', component: ExpensesOverviewComponent },
      { path: 'expenses/add-expense', component: AddExpenseComponent },
      { path: 'expenses/add-category', component: AddCategoryComponent },
      { path: 'expenses/remove-category', component: RemoveCategoryComponent },
      { path: 'savings/savings-overview', component: SavingsOverviewComponent },
      { path: 'savings/savings-activity', component: SavingsActivityComponent },
      { path: 'savings/savings-transactions', component: SavingsTransactionsComponent },
      { path: 'savings/savings-move-money/:id', component: SavingsMoveMoneyComponent },
      { path: 'dash/dashboard-expense', component: DashboardExpenseComponent },
      { path: 'dash/dashboard-upcoming-bill', component: DashboardUpcomingBillComponent },
      { path: 'dash/dashboard-recent-transactions', component: DashboardRecentTransactionsComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
