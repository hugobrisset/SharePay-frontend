import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Participant {
  id: number;
  name: string;
  user_id: number | null;
  selected?: boolean;
  exactAmount?: number;
  parts? : number;

  locked?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private baseURL = 'http://localhost:3000/groups';

  constructor(private http: HttpClient) {}

  getUserGroups(){
    return this.http.get(`${this.baseURL}/getUserGroups`);
  }

  getParticipants(groupId: number): Observable<Participant[]>{
    return this.http.get<Participant[]>(`${this.baseURL}/${groupId}/participants`)
  }

  createGroup(data: any): Observable<{ id: number; name: string }> {
    return this.http.post<{ id: number; name: string }>(`${this.baseURL}/createGroup`, data);
  }

  getExpenses(groupId: number): Observable<any> {
    return this.http.get(`${this.baseURL}/${groupId}/getAllExpense`);
  }
}
