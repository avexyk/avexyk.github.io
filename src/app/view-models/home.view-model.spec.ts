import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { INotificationService } from '@business-objects';
import { provideAvexykArchetype } from '@ioc';
import { HomeViewModel } from './home.view-model';

describe('HomeViewModel', () => {
  let viewModel: HomeViewModel;
  let notificationService: INotificationService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideAvexykArchetype({
          contentBaseAddress: '/content',
          defaultColorMode: 'dark',
          colorModeStorageKey: 'colorMode',
          defaultToastDurationMs: 0,
          useFakes: true,
        }),
      ],
    });
    viewModel = TestBed.inject(HomeViewModel);
    notificationService = TestBed.inject(INotificationService);
    await viewModel.initialize();
  });

  it('carga perfil y secciones desde el puerto', () => {
    expect(viewModel.isLoading()).toBe(false);
    expect(viewModel.errorMessage()).toBeNull();
    expect(viewModel.profile()?.firstName).toBe('Francisco Javier');
    expect(viewModel.sections().length).toBeGreaterThan(0);
  });

  it('emite notificación variante home al hacer clic en una sección', () => {
    const section = viewModel.sections()[0];
    viewModel.onSectionClick(section);

    expect(notificationService.notifications().length).toBe(1);
    expect(notificationService.notifications()[0].variant).toBe('home');
    expect(notificationService.notifications()[0].message).toBe(section.toastMessage);
  });
});
