import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FocusService } from '../core/focus.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonButton],
})
export class HomePage {

  healthData: any;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private focusService: FocusService)
     {}

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    localStorage.removeItem('token');
  }

  goToLogin() {
    this.focusService.clearFocus();
    this.router.navigate(['/auth']);
  }

  goToGroups() {
    this.focusService.clearFocus();
    this.router.navigate(['/groups']);
  }
}
