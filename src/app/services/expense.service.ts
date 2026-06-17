import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private baseURL = 'http://localhost:3000/groups';

  constructor(private http: HttpClient) {}

  createExpense(groupId: number, data: {
    title: string;
    amount: number;
    payerId: number;
    splits: { participantId: number; amount: number }[];
  }) {
    return this.http.post(
      `${this.baseURL}/${groupId}/create-expenses`,
      data
    );
  }

}
