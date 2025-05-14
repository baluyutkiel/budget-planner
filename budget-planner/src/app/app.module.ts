import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AddAccountComponent } from './account/add-account/add-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpensesOverviewComponent } from './expenses/expenses-overview/expenses-overview.component';
import { AddExpenseComponent } from './expenses/add-expense/add-expense.component';
import { AddCategoryComponent } from './expenses/add-category/add-category.component';
import { RemoveCategoryComponent } from './expenses/remove-category/remove-category.component';
import { LoginComponent } from './login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { SavingsOverviewComponent } from './savings/savings-overview/savings-overview.component';
import { SavingsActivityComponent } from './savings/savings-activity/savings-activity.component';
import { SavingsTransactionsComponent } from './savings/savings-transactions/savings-transactions.component';
import { SavingsMoveMoneyComponent } from './savings/savings-move-money/savings-move-money.component';
import { DashboardExpenseComponent } from './dash/dashboard-expense/dashboard-expense.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';  // MatSelect module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardUpcomingBillComponent } from './dash/dashboard-upcoming-bill/dashboard-upcoming-bill.component';
import { DashboardRecentTransactionsComponent } from './dash/dashboard-recent-transactions/dashboard-recent-transactions.component'; // Required for Angular Material



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    AccountsComponent,
    AddAccountComponent,
    ExpensesOverviewComponent,
    AddExpenseComponent,
    AddCategoryComponent,
    RemoveCategoryComponent,
    LoginComponent,
    MainComponent,
    SavingsOverviewComponent,
    SavingsActivityComponent,
    SavingsTransactionsComponent,
    SavingsMoveMoneyComponent,
    DashboardExpenseComponent,
    DashboardUpcomingBillComponent,
    DashboardRecentTransactionsComponent
  ],
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
