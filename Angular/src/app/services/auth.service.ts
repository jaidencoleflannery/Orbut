import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post('/api/login', credentials);
  }

  logout() {
    return this.http.post('/api/logout', {});
  }

  isAuthenticated() {
    return this.http.get('https://localhost:3000/protected');
  }
}
