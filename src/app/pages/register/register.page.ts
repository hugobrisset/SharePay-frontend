import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonInput, FormsModule]
})
export class RegisterPage implements OnInit {

  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(){
    const data = {
      username: this.username,
      email: this.email,
      password: this.password,
    }

    this.authService.register(data).subscribe({
      next: (res) => {
        console.log("Register OK", res);
        this.router.navigate(['/auth']);
      },
      error: (err) => {
        console.error('REGISTER ERROR:', err);
      }
    });
  }

  ngOnInit() {
  }

}
