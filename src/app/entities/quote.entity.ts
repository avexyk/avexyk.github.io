export interface Quote {
  readonly text: string;
  readonly author: string;
}

export interface QuotesCollection {
  readonly data: readonly Quote[];
}
