# Budget Planner - Angular Application

## Overview
The **Budget Planner** is an Angular-based web application designed to help users manage their expenses effectively. It includes features such as adding and removing accounts, tracking variable and non-variable expenses, and managing a user profile. The application also provides an overview dashboard that summarizes financial activities.

## Features
- **Overview Dashboard**: Provides a summary of total expenses and account balances.
- **Expense Management**: Add, edit, and delete variable and non-variable expenses.
- **Account Management**: Add and remove accounts with associated details such as bank name, card type, and balance.
- **User Profile**: Manage user details and preferences.
- **Filtering and Sorting**: Sort expenses based on category, account type, and expense type.
- **Form Validation**: Ensures accurate data entry with Angular validators.
- **Animations and Styling**: Utilizes Bootstrap framework along with animations for enhanced UI experience.

## Technologies Used
This application showcases various Angular functionalities and concepts, including:
- **Angular Directives**: `ngClass`, `ngStyle`, `ngIf`, `ngFor`
- **Reactive Forms**: `FormGroup`, `FormControl`, `Validators`
- **Observables and RxJS**: Handling asynchronous data
- **Angular Routing**: Navigating between different sections of the app
- **Bootstrap Framework**: Styling and responsive design
- **CSS Animations**: Adding smooth transitions and effects

## Installation
### Prerequisites
- Node.js (latest LTS version recommended)
- Angular CLI installed globally (`npm install -g @angular/cli`)

### Steps to Run the Application
1. Clone the repository:
   ```sh
   git clone
   cd budget-planner
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the application:
   ```sh
   ng serve
   ```
4. Open your browser and visit `http://localhost:4200/` to access the app.

## Usage
1. **Add an Account**: Navigate to the accounts section and input the required details.
2. **Add an Expense**: Select an account, input expense details, and choose an expense type.
3. **Filter Expenses**: Use the dropdown menu to view specific types of expenses.
4. **Overview Dashboard**: Get a quick summary of expenses and account balances.
5. **User Profile**: Manage your personal information and preferences.

## Future Enhancements
- **Export to CSV/PDF**: Ability to export financial reports.
- **Budget Goals**: Set spending limits and track savings progress.
- **Cloud Storage Integration**: Sync data across multiple devices.
- **UI/UX Enhancements**: More intuitive

