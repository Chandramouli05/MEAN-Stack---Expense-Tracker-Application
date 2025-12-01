import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ExpenseStore } from '../store/expense.store';
import { FormsModule } from '@angular/forms';
import { Expense } from '../shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expense.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css',
})
export class AddExpenseComponent {
  model: Expense = {
    title: '',
    amount: '',
    cateogory: '',
    date: new Date().toISOString(),
    notes: '',
  };

  error = signal(false);
  errorMsg = signal('');

  constructor(public store: ExpenseStore, private router: Router) {}

  async save() {
    if (!this.model.title || !this.model.amount || !this.model.cateogory || !this.model.date) {
      this.error.set(true);
      this.errorMsg.set('Please fill the required fields');
      return;
    }
    await this.store.create(this.model);
    this.router.navigate(['/list']);
  }

  cancel() {
    this.router.navigate(['/']);
  }

  ngDoCheck() {
  console.log("Selected:", this.model.cateogory);
}
}
