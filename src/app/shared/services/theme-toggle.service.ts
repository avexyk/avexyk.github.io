import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeToggleService {

  private isThemeActive: boolean = false;
  private colorMode: string = 'light';

  constructor() { }

  loadColorMode() {
    this.colorMode = localStorage.getItem('colorMode') || 'dark'; // si no existe es dark
    this.isThemeActive = this.colorMode === 'dark' ? true : false;

    this.loadVagabundia(); // siempre sabe si el tema esta activo
  }

  loadTheme() {
    if (this.isThemeActive) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('colorMode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('colorMode', 'light');
    }
  }

  changeTheme() {
    if (this.isThemeActive) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('colorMode', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('colorMode', 'dark');
    }
  }

  loadVagabundia() {
    let vagabundia = document.querySelector('.vagabundia');
    if (this.isThemeActive) {
      vagabundia?.classList.remove('hidden');
    } else {
      vagabundia?.classList.add('hidden');
    }
  }
}
