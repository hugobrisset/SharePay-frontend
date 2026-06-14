import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  healthData: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getHealth().subscribe({
      next: (res) => {
        console.log('Backend response:', res);
        this.healthData = res;
      },
      error: (err) => {
        console.error('Erreur API:', err);
      }
    });
  }
}
