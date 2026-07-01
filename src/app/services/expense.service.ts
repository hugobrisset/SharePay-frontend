import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface FinancialSummary {
  balances: {
    participantId: number;
    name: string;
    balance: number;
  }[];
  settlements: {
    from: string;
    to: string;
    amount: number;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private baseURL = 'http://localhost:3000/groups';

  constructor(private http: HttpClient) {}

  createExpense(groupId: number, data: {
    title: string;
    amount: number;
    payerParticipantId: number;
    splitMode: string;
    splits: { participantId: number; amount: number, parts?: number }[];
  }) {

    return this.http.post(
      `${this.baseURL}/${groupId}/create-expenses`,
      data
    );
  }

  getExpense(expenseId: number){
    return this.http.get(`${this.baseURL}/expenses/${expenseId}`)
  }

  updateExpense(
    groupId: number,
    expenseId: number,
    data: {
      title: string;
      amount: number;
      payerParticipantId: number;
      splitMode: string;
      splits: { participantId: number; amount: number; parts?: number }[];
    }
  ) {
    return this.http.put(
      `${this.baseURL}/expenses/update/${expenseId}`,
      data
    );
  }

  getBalance(groupId: number) {
    return this.http.get<FinancialSummary>(`${this.baseURL}/${groupId}/balance`);
  }
}
