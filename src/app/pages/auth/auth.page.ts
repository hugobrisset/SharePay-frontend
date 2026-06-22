import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { FocusService } from 'src/app/core/focus.service';

import {AppHeaderComponent } from 'src/app/components/app-header/app-header.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, AppHeaderComponent]
})
export class AuthPage implements OnInit {

  email = '';
  password = '';

  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router : Router,
    private focusService: FocusService) {}

  login(){
    this.errorMessage = '';
    this.isLoading = true;

    const data = {
      email: this.email,
      password: this.password,
    }

    this.authService.login(data).subscribe({
      next: (res: any) => {
   
        this.authService.saveToken(res.token);
        this.authService.saveUser(res.user);
        
        this.isLoading = false;

        this.focusService.clearFocus();
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.isLoading = false;

        if (err.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else if (err.status === 0) {
          this.errorMessage = 'Server unreachable';
        } else {
          this.errorMessage = 'Something went wrong';
        }

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
