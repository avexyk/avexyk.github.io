import { Quote } from '@entities';
import { Result } from '@libraries/result-entities';

export abstract class IQuotesModel {
  abstract getQuotes(): Promise<Result<readonly Quote[], string>>;
  abstract getRandomQuote(): Promise<Result<Quote, string>>;
}
