import { Routes } from '@angular/router';
import { HomeComponent } from './home.component/home.component';
import { AddExpenseComponent } from './add-expense.component/add-expense.component';
import { EditExpenseComponent } from './edit-expense.component/edit-expense.component';
import { ListExpenseComponent } from './list-expense.component/list-expense.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddExpenseComponent },
  { path: 'edit/:id', component: EditExpenseComponent },
  { path: 'list', component: ListExpenseComponent },
  { path: '**', redirectTo: '' },
];
