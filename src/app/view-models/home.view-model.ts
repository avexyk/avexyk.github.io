import { inject, Injectable, signal } from '@angular/core';
import { INotificationService, ISiteContentModel } from '@business-objects';
import { Profile, SiteSection } from '@entities';
import { handleResult } from '@libraries/result-entities';

@Injectable()
export class HomeViewModel {
  private readonly siteContentModel = inject(ISiteContentModel);
  private readonly notificationService = inject(INotificationService);

  private readonly profileSignal = signal<Profile | null>(null);
  private readonly sectionsSignal = signal<readonly SiteSection[]>([]);
  private readonly isLoadingSignal = signal<boolean>(true);
  private readonly errorMessageSignal = signal<string | null>(null);

  readonly profile = this.profileSignal.asReadonly();
  readonly sections = this.sectionsSignal.asReadonly();
  readonly isLoading = this.isLoadingSignal.asReadonly();
  readonly errorMessage = this.errorMessageSignal.asReadonly();

  async initialize(): Promise<void> {
    this.isLoadingSignal.set(true);
    const result = await this.siteContentModel.getSiteContent();
    handleResult(
      result,
      (content) => {
        this.profileSignal.set(content.profile);
        this.sectionsSignal.set(content.sections);
        this.errorMessageSignal.set(null);
      },
      (error) => {
        this.errorMessageSignal.set(error);
      }
    );
    this.isLoadingSignal.set(false);
  }

  onSectionClick(section: SiteSection): void {
    this.notificationService.show(section.toastMessage, 'home');
  }
}
