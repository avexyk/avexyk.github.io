export type SectionIconId = 'code-brackets' | 'music-note' | 'question-circle';

export interface SiteSection {
  readonly id: string;
  readonly title: string;
  readonly actionLabel: string;
  readonly route: string;
  readonly iconId: SectionIconId;
  readonly gradientClasses: string;
  readonly iconClasses: string;
  readonly actionColorClasses: string;
  readonly toastMessage: string;
}
