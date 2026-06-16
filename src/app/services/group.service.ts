import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private baseURL = 'http://localhost:3000/groups';

  constructor(private http: HttpClient) {}

  getUserGroups(){
    return this.http.get(`${this.baseURL}/getUserGroups`)
  }
}
