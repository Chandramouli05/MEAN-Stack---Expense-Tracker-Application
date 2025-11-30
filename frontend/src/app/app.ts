import { Component, effect, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ExpenseStore } from './store/expense.store';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = signal('expense-tracker-app');

  // create a signal to track expense count if needed
  expenseCount = signal(0);

  constructor(public store: ExpenseStore) {
    // initialize expenseCount from the store
    this.expenseCount.set(this.store.totalCount());

    // effect to reactively update expenseCount when store changes
    effect(() => {
      this.expenseCount.set(this.store.totalCount());
    });
  }
}
