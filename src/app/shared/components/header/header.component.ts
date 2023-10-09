import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showDarkTheme: boolean = false;
  showMenu: boolean = false;

  constructor( 
    private toastr: ToastrService
  ) {}
  
  
  ngOnInit(): void {

    this.checkTheme();

  }

  // TODO: Optimizar
  checkTheme() {
    if (localStorage.getItem('colorMode') === 'dark') {
      document.documentElement.classList.add('dark');
      this.showDarkTheme = true;
    } else if (localStorage.getItem('colorMode') === 'light') {
      document.documentElement.classList.remove('dark');
      this.showDarkTheme = false;
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('colorMode', 'dark');
      this.showDarkTheme = true;
    }
  }

  changeTheme() {
    if (localStorage.getItem('colorMode') === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('colorMode', 'light');
      this.showDarkTheme = false;
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('colorMode', 'dark');
      this.showDarkTheme = true;
    }

    let vagabundia = document.querySelector('.vagabundia');
    if (vagabundia?.classList.contains('hidden')) {
      vagabundia?.classList.remove('hidden')
    } else {
      vagabundia?.classList.add('hidden')
    }
    console.log( vagabundia );
  }

  showMenuModal() {
    this.showMenu = !this.showMenu;
  }

  showMsg() {
    this.toastr.info('Nada por aquí', undefined, {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
      toastClass: 'header-page ngx-toastr'
    });
  }

}
