import { Injectable } from '@angular/core';
import { IQuotesModel } from '@business-objects';
import { Quote } from '@entities';
import { Result, success } from '@libraries/result-entities';

const FAKE_QUOTES: readonly Quote[] = [
  {
    text: 'The most important work should not be seen.',
    author: 'Souta Munakata',
  },
  {
    text: 'JUST COMMUNICATION',
    author: 'TWO-MIX',
  },
];

@Injectable()
export class QuotesModelFake implements IQuotesModel {
  async getQuotes(): Promise<Result<readonly Quote[], string>> {
    return success(FAKE_QUOTES);
  }

  async getRandomQuote(): Promise<Result<Quote, string>> {
    return success(FAKE_QUOTES[0]);
  }
}
