import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expense } from '../shared/models';
import { ExpenseStore } from '../store/expense.store';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-expense.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.css',
})
export class EditExpenseComponent implements OnInit {
  model: Expense | null = null;
  id!: string;

  constructor(public store: ExpenseStore, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    const local = this.store.getIdByLocal(this.id);

    if (local) {
      this.model = { ...local };
    } else {
      this.store.loadAll().then(() => {
        const exp = this.store.getIdByLocal(this.id);
        if (exp) this.model = { ...exp };
      });
    }
  }

  async save() {
    if (!this.model || !this.id) return;
    await this.store.update(this.id, this.model);
    this.router.navigate(['/list']);
  }

  cancel() {
    this.router.navigate(['/list']);
  }
}
