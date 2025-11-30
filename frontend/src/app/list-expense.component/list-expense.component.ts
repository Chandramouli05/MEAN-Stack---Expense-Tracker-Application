import { Component, computed, OnInit } from '@angular/core';
import { ExpenseStore } from '../store/expense.store';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-expense.component',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-expense.component.html',
  styleUrl: './list-expense.component.css',
})
export class ListExpenseComponent implements OnInit {
  constructor(public store: ExpenseStore) {}

  items = computed(() => this.store.expenses());
  loading = computed(() => this.store.loading());
  error = computed(() => this.store.error);

  ngOnInit() {
    this.store.loadAll();
  }

  async delete(id?: string) {
    if (!id) return;
    if (!confirm('Delete this expense?')) return;
    await this.store.delete(id);
  }


}
