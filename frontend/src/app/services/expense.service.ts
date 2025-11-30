import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Expense } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiLink = environment.apiUrl + '/expenses';

  constructor(private http: HttpClient) {}

  getAll() {
    return firstValueFrom(this.http.get<Expense[]>(this.apiLink));
  }

  getAllById(id: string) {
    return firstValueFrom(this.http.get<Expense>(`${this.apiLink}/${id}`));
  }

  create(expense: Expense) {
    return firstValueFrom(this.http.post<Expense>(this.apiLink, expense));
  }

  update(id: string, expense: Partial<Expense>) {
    return firstValueFrom(this.http.put<Expense>(`${this.apiLink}/${id}`, expense));
  }

  delete(id: string) {
    return firstValueFrom(this.http.delete(`${this.apiLink}/${id}`));
  }
}
