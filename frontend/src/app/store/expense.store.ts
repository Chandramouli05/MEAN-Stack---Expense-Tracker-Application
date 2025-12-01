import { signal, computed, Injectable } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ExpenseStore {
  constructor(private service: ExpenseService) {}

  //signals
  private _expenses = signal<Expense[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  //computed
  totalCount = computed(() => this._expenses().length);
  totalAmount = computed(() => this._expenses().reduce((s, e) => s + Number(e.amount || 0), 0));
  hightestAmount = computed(() => Math.max(...this._expenses().map((e) => Number(e.amount || 0)), 0));

  // read-only getters
  get expenses() {
    return this._expenses;
  }

  // methods
  async loadAll() {
    this.loading.set(false);
    this.error.set(null);
    try {
      const data = await this.service.getAll();

      this._expenses.set(data);
    } catch (err: any) {
      this.error.set(err.message || 'Failed to Load');
    } finally {
      this.loading.set(false);
    }
  }

  async create(expense: Expense) {
    this.loading.set(true);
    try {
      const addData = await this.service.create(expense);
      this._expenses.update((list) => [addData, ...list]);
    } catch (err: any) {
      this.error.set(err?.message || 'Failed to Add Value');
    } finally {
      this.loading.set(false);
    }
  }

  async update(id: string, expense: Partial<Expense>) {
    this.loading.set(true);
    try {
      const updateData = await this.service.update(id, expense);
      this._expenses.update((list) => list.map((e) => (e._id !== id ? updateData : e)));
    } catch (err: any) {
      this.error.set(err.message || 'Failed to Update');
    } finally {
      this.loading.set(false);
    }
  }

  async delete(id: string) {
    this.loading.set(true);
    try {
      await this.service.delete(id);
      this._expenses.update((list) => list.filter((e) => e._id !== id));
    } catch (err: any) {
      this.error.set(err.message || 'Failed to Delete');
    } finally {
      this.loading.set(false);
    }
  }

  getIdByLocal(id: string) {
    return this._expenses().find((e) => e._id === id) ?? null;
  }

  latest() {
    return this._expenses()[0] ?? null;
  }
}
