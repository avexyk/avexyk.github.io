import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { INotificationService } from '@business-objects';
import { provideAvexykArchetype } from '@ioc';
import { HeaderViewModel } from './header.view-model';

describe('HeaderViewModel', () => {
  let viewModel: HeaderViewModel;
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
    viewModel = TestBed.inject(HeaderViewModel);
    notificationService = TestBed.inject(INotificationService);
    await viewModel.initialize();
  });

  it('carga navegación y alterna el tema reactivamente', () => {
    expect(viewModel.isDarkMode()).toBe(true);
    expect(viewModel.navItems().length).toBeGreaterThan(0);

    viewModel.toggleTheme();
    expect(viewModel.isDarkMode()).toBe(false);
  });

  it('cierra el menú sin lanzar toast cuando toastMessage está vacío', () => {
    viewModel.toggleMenu();
    expect(viewModel.isMenuOpen()).toBe(true);

    const item = { ...viewModel.navItems()[0], toastMessage: '' };
    viewModel.onNavItemClick(item);

    expect(viewModel.isMenuOpen()).toBe(false);
    expect(notificationService.notifications().length).toBe(0);
  });

  it('cierra el menú y muestra toast cuando toastMessage tiene contenido', () => {
    viewModel.toggleMenu();
    expect(viewModel.isMenuOpen()).toBe(true);

    const item = { ...viewModel.navItems()[0], toastMessage: 'In development' };
    viewModel.onNavItemClick(item);

    expect(viewModel.isMenuOpen()).toBe(false);
    expect(notificationService.notifications().length).toBe(1);
    expect(notificationService.notifications()[0].variant).toBe('header');
    expect(notificationService.notifications()[0].message).toBe('In development');
  });
});
