import { Injectable } from '@angular/core';
import * as Quotes from '../../data/quotes.json';
import { Observable, of } from 'rxjs';
import { QuoteModel } from '@core/models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  dataQuoteRandom$: Observable<QuoteModel[]> = of([]);

  constructor() {
    this.getQuotes();
  }

  private getQuotes() {
    const { data }: any = (Quotes as any).default;
    this.dataQuoteRandom$ = of(data);
  }
}
