import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    console.log("INTERCEPTOR APPELÉ");
    // 1. récupérer le token
    const token = this.authService.getToken();

    // 2. si token existe, on clone la requête
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(cloned);
    }

    // 3. sinon on envoie la requête normale
    return next.handle(req);
  }
}