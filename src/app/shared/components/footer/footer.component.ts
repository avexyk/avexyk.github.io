import { Component } from '@angular/core';
import { QuoteModel } from '@core/models/quote.model';
import { QuotesService } from '@shared/services/quotes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  currentYear: number = new Date().getFullYear();
  quote: QuoteModel = { text: '', author: ''};

  constructor( 
    private toastr: ToastrService,
    private quotesService: QuotesService
  ) {
    this.getSingleQuote();
  }

  getSingleQuote() {
    this.quotesService.dataQuoteRandom$.subscribe({
      next: quotes => this.quote = quotes[Math.floor(Math.random() * quotes.length)],
      error: err => console.error('Error: ' + err),
      complete: () => true
    });
  }

  showMsg() {
    this.toastr.info('Algo debería suceder?, tal  vez...', 'Gif retro?', {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
      toastClass: 'footer-page ngx-toastr'
    });
  }

}
