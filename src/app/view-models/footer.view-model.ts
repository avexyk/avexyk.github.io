import { computed, inject, Injectable, signal } from '@angular/core';
import {
  IColorModeGateway,
  INotificationService,
  IQuotesModel,
  ISiteContentModel,
} from '@business-objects';
import { Quote, SiteInfo } from '@entities';
import { handleResult } from '@libraries/result-entities';

@Injectable()
export class FooterViewModel {
  private readonly quotesModel = inject(IQuotesModel);
  private readonly siteContentModel = inject(ISiteContentModel);
  private readonly colorModeGateway = inject(IColorModeGateway);
  private readonly notificationService = inject(INotificationService);

  private readonly quoteSignal = signal<Quote>({ text: '', author: '' });
  private readonly siteInfoSignal = signal<SiteInfo | null>(null);

  readonly currentYear = signal<number>(new Date().getFullYear()).asReadonly();
  readonly quote = this.quoteSignal.asReadonly();
  readonly siteInfo = this.siteInfoSignal.asReadonly();
  readonly isVagabundiaVisible = computed(
    () => this.colorModeGateway.currentMode() === 'dark'
  );

  async initialize(): Promise<void> {
    const [contentResult, quoteResult] = await Promise.all([
      this.siteContentModel.getSiteContent(),
      this.quotesModel.getRandomQuote(),
    ]);

    handleResult(
      contentResult,
      (content) => this.siteInfoSignal.set(content.siteInfo),
      () => {}
    );

    handleResult(
      quoteResult,
      (quote) => this.quoteSignal.set(quote),
      () =>
        this.quoteSignal.set({
          text: 'The most important work should not be seen.',
          author: 'Souta Munakata',
        })
    );
  }

  onVagabundiaClick(): void {
    const info = this.siteInfoSignal();
    this.notificationService.show(
      info?.vagabundiaToastMessage ?? 'Algo debería suceder?, tal  vez...',
      'footer',
      info?.vagabundiaToastTitle ?? 'Gif retro?'
    );
  }
}
