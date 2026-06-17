import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  private apiUrl = 'http://localhost:3000/groups';

  constructor(private http: HttpClient) {}

  generateInvite(groupId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${groupId}/invite`, {});
  }
  
  getInviteInfo(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${token}`);
  }

  joinGroup(token: string, participantId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${token}/join`,{ participantId });
  }
}
