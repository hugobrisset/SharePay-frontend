import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root', // service accessible partout dans l'app
})
export class ApiService {
  // URL de ton backend Express
  private baseUrl = 'http://localhost:3000';
  
  // On injecte HttpClient pour faire des requete HTTP
  constructor(private http: HttpClient){}

  // Appel vers le backend
  getHealth() {
    // retourn un observable (flux de données)
    return this.http.get(`${this.baseUrl}/health`);
  }
}
