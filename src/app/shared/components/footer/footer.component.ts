import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  currentYear: number = new Date().getFullYear();

  constructor( 
    private toastr: ToastrService
  ) {}

  showMsg() {
    this.toastr.info('Algo debería suceder?, tal  vez...', 'Gif retro?', {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
      toastClass: 'footer-page ngx-toastr'
    });

    console.log( "I'll Be Your Home" );
  }

}
