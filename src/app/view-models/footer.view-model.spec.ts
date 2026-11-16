import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { IColorModeGateway, INotificationService } from '@business-objects';
import { provideAvexykArchetype } from '@ioc';
import { FooterViewModel } from './footer.view-model';

describe('FooterViewModel', () => {
  let viewModel: FooterViewModel;
  let colorModeGateway: IColorModeGateway;
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
    viewModel = TestBed.inject(FooterViewModel);
    colorModeGateway = TestBed.inject(IColorModeGateway);
    notificationService = TestBed.inject(INotificationService);
    await viewModel.initialize();
  });

  it('carga cita y sincroniza visibilidad de vagabundia con ColorMode', () => {
    expect(viewModel.quote().text.length).toBeGreaterThan(0);
    expect(viewModel.isVagabundiaVisible()).toBe(true);

    colorModeGateway.toggleColorMode();
    expect(viewModel.isVagabundiaVisible()).toBe(false);
  });

  it('emite notificación variante footer al hacer clic en vagabundia', () => {
    viewModel.onVagabundiaClick();

    expect(notificationService.notifications().length).toBe(1);
    expect(notificationService.notifications()[0].variant).toBe('footer');
    expect(notificationService.notifications()[0].title).toBe('Gif retro?');
  });
});
