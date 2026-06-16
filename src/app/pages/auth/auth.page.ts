import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FocusService } from 'src/app/core/focus.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonInput, FormsModule]
})
export class AuthPage implements OnInit {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router : Router,
    private focusService: FocusService) {}

  login(){
    const data = {
      email: this.email,
      password: this.password,
    }

    this.authService.login(data).subscribe({
      next: (res: any) => {
        console.log('LOGIN OK:', res);
        this.authService.saveToken(res.token);

        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error('LOGIN ERROR:', err);
      }
    });
  }

  goToRegister() {
    this.focusService.clearFocus();
    this.router.navigate(['/register']);
  }

  ngOnInit() {
  }

}
