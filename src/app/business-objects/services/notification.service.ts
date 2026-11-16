import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { ToastNotification, ToastVariant } from '@entities';
import { INotificationService } from '../interfaces/i-notification.service';
import { AVEXYK_OPTIONS } from '../options/avexyk.options';

@Injectable()
export class NotificationService implements INotificationService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly options = inject(AVEXYK_OPTIONS);
  private readonly notificationsSignal = signal<readonly ToastNotification[]>([]);

  readonly notifications = this.notificationsSignal.asReadonly();

  show(
    message: string,
    variant: ToastVariant = 'info',
    title?: string,
    durationMs: number = this.options.defaultToastDurationMs
  ): void {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const notification: ToastNotification = { id, message, title, variant, durationMs };

    this.notificationsSignal.update((current) => [...current, notification]);

    if (isPlatformBrowser(this.platformId) && durationMs > 0) {
      setTimeout(() => this.dismiss(id), durationMs);
    }
  }

  dismiss(id: string): void {
    this.notificationsSignal.update((current) =>
      current.filter((item) => item.id !== id)
    );
  }
}
