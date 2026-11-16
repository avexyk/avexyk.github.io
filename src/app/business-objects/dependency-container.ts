import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { INotificationService } from './interfaces/i-notification.service';
import { AVEXYK_OPTIONS, AvexykOptions } from './options/avexyk.options';
import { NotificationService } from './services/notification.service';

export function provideBusinessObjects(options: AvexykOptions): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: AVEXYK_OPTIONS, useValue: options },
    { provide: INotificationService, useClass: NotificationService },
  ]);
}
