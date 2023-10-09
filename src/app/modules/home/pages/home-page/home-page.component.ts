import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor( 
    private toastr: ToastrService
  ) {}

  showMsg() {
    this.toastr.info('En desarrollo', undefined, {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
      toastClass: 'home-page ngx-toastr'
    });
  }

}
