export type ToastVariant = 'home' | 'header' | 'footer' | 'info';

export interface ToastNotification {
  readonly id: string;
  readonly message: string;
  readonly title?: string;
  readonly variant: ToastVariant;
  readonly durationMs: number;
}
