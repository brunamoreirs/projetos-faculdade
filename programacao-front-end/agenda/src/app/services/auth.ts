import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged = false;
  private redirect = '/contato/list';

  login(user: string, senha: string): boolean {
    if (user === 'admin' && senha === '1234') {
      this.logged = true;
      return true;
    }
    return false;
  }

  isLogged(): boolean {
    return this.logged;
  }

  logout() {
    this.logged = false;
  }

  setRedirectUrl(url: string) {
    this.redirect = url;
  }

  getRedirectUrl(): string {
    return this.redirect;
  }
}
