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
    RemoveCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
