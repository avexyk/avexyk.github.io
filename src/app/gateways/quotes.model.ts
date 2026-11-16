import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AVEXYK_OPTIONS, IQuotesModel } from '@business-objects';
import { Quote, QuotesCollection } from '@entities';
import { failure, Result, success } from '@libraries/result-entities';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class QuotesModel implements IQuotesModel {
  private readonly http = inject(HttpClient);
  private readonly options = inject(AVEXYK_OPTIONS);

  private cachedQuotes$: Promise<Result<readonly Quote[], string>> | null = null;

  getQuotes(): Promise<Result<readonly Quote[], string>> {
    if (!this.cachedQuotes$) {
      this.cachedQuotes$ = this.fetchQuotes();
    }
    return this.cachedQuotes$;
  }

  async getRandomQuote(): Promise<Result<Quote, string>> {
    const result = await this.getQuotes();
    if (result.hasError) {
      return result;
    }
    const quotes = result.successValue;
    if (quotes.length === 0) {
      return failure('No hay citas disponibles en quotes.json');
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return success(quotes[randomIndex]);
  }

  private async fetchQuotes(): Promise<Result<readonly Quote[], string>> {
    try {
      const base = this.options.contentBaseAddress.replace(/\/+$/, '');
      const response = await firstValueFrom(
        this.http.get<QuotesCollection>(`${base}/quotes.json`)
      );
      return success(response.data ?? []);
    } catch (error) {
      this.cachedQuotes$ = null;
      return failure(`Error al cargar las citas: ${String(error)}`);
    }
  }
}
