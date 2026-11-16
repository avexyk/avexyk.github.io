import { inject, Injectable, signal } from '@angular/core';
import { ISiteContentModel } from '@business-objects';
import { FaqEntry } from '@entities';
import { handleResult } from '@libraries/result-entities';

@Injectable()
export class FaqViewModel {
  private readonly siteContentModel = inject(ISiteContentModel);

  private readonly faqTitleSignal = signal<string>('FAQ');
  private readonly faqsSignal = signal<readonly FaqEntry[]>([]);
  private readonly isLoadingSignal = signal<boolean>(true);
  private readonly errorMessageSignal = signal<string | null>(null);

  readonly faqTitle = this.faqTitleSignal.asReadonly();
  readonly faqs = this.faqsSignal.asReadonly();
  readonly isLoading = this.isLoadingSignal.asReadonly();
  readonly errorMessage = this.errorMessageSignal.asReadonly();

  async initialize(): Promise<void> {
    this.isLoadingSignal.set(true);
    const result = await this.siteContentModel.getSiteContent();
    handleResult(
      result,
      (content) => {
        this.faqTitleSignal.set(content.faqTitle);
        this.faqsSignal.set(content.faqs);
        this.errorMessageSignal.set(null);
      },
      (error) => {
        this.errorMessageSignal.set(error);
      }
    );
    this.isLoadingSignal.set(false);
  }
}
