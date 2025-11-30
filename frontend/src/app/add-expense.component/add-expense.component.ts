import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    cateogory: 'General',
    date: new Date().toISOString(),
    notes: '',
  };
  constructor(public store: ExpenseStore, private router: Router) {}

  async save() {
    await this.store.create(this.model);
    this.router.navigate(['/list']);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
