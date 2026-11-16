export type NavIconId = 'home' | 'music' | 'question-circle' | 'code' | 'fire';

export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly route: string;
  readonly iconId: NavIconId;
  readonly toastMessage: string;
}
