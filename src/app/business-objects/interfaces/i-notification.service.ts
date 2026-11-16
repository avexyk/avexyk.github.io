import { Signal } from '@angular/core';
import { ToastNotification, ToastVariant } from '@entities';

export abstract class INotificationService {
  abstract readonly notifications: Signal<readonly ToastNotification[]>;
  abstract show(message: string, variant?: ToastVariant, title?: string, durationMs?: number): void;
  abstract dismiss(id: string): void;
}
