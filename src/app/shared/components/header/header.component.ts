import { Component, OnInit } from '@angular/core';
import { ThemeToggleService } from '@shared/services/theme-toggle.service';
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
    private toastr: ToastrService,
    private themeToggleService: ThemeToggleService
  ) {}
  
  
  ngOnInit(): void {
    this.themeToggleService.loadColorMode();
    this.themeToggleService.loadTheme();
  }

  changeTheme() {
    this.themeToggleService.changeTheme();
    this.themeToggleService.loadColorMode();
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
