import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { AVEXYK_OPTIONS, INotificationService } from '@business-objects';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: INotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'server' },
        {
          provide: AVEXYK_OPTIONS,
          useValue: {
            contentBaseAddress: '/content',
            defaultColorMode: 'dark',
            colorModeStorageKey: 'colorMode',
            defaultToastDurationMs: 1500,
          },
        },
        { provide: INotificationService, useClass: NotificationService },
      ],
    });
    service = TestBed.inject(INotificationService);
  });

  it('agrega y elimina notificaciones reactivamente', () => {
    expect(service.notifications().length).toBe(0);

    service.show('En desarrollo', 'home');
    expect(service.notifications().length).toBe(1);
    expect(service.notifications()[0].message).toBe('En desarrollo');
    expect(service.notifications()[0].variant).toBe('home');

    const id = service.notifications()[0].id;
    service.dismiss(id);
    expect(service.notifications().length).toBe(0);
  });
});
