import { CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { ExpenseStore } from '../store/expense.store';

@Component({
  selector: 'app-home.component',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(public store: ExpenseStore) {}

  totalCount = computed(() => this.store.totalCount());
  totalAmount = computed(() => this.store.totalAmount());
  latest = computed(() => this.store.latest());

  ngOnInit() {
    this.store.loadAll();
  }
}
