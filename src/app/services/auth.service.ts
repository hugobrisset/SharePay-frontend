import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private baseURL = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  //Register
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/register`, data);
  }

  //Login
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, data);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUsername() {
    return this.getUser()?.username;
  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //stockage Token
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
