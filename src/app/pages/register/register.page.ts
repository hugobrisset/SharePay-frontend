import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { FocusService } from 'src/app/core/focus.service';

import {AppHeaderComponent } from 'src/app/components/app-header/app-header.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, AppHeaderComponent]
})
export class RegisterPage implements OnInit {

  username = '';
  email = '';
  password = '';

  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private focusService: FocusService)
    {}

      ngOnInit() {
  }

  register(){
    this.errorMessage = '';
    this.isLoading = true;


    const data = {
      username: this.username,
      email: this.email,
      password: this.password,
    }

    this.authService.register(data).subscribe({
      next: (res) => {
        this.isLoading = false;

        //login automatique
        this.authService.saveToken(res.token);
        this.authService.saveUser(res.user);

        this.focusService.clearFocus();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;

        if (err.status === 0) {
          this.errorMessage = 'Server unreachable';
        } else {
          this.errorMessage = err.error?.error || 'Something went wrong';
        }
      }
    });
  }

  goToLogin() {
    this.focusService.clearFocus();
    this.router.navigate(['/auth']);
  }



}
