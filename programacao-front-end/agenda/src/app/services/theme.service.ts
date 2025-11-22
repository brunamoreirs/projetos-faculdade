import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private key = 'agenda_tema';

  constructor() {
    const saved = localStorage.getItem(this.key);
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }

  toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem(this.key, isDark ? 'dark' : 'light');
  }

  isDark(): boolean {
    return document.body.classList.contains('dark-mode');
  }
}
