import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { provideAvexykArchetype } from '@ioc';
import { FaqViewModel } from './faq.view-model';

describe('FaqViewModel', () => {
  let viewModel: FaqViewModel;

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
    viewModel = TestBed.inject(FaqViewModel);
    await viewModel.initialize();
  });

  it('carga título y preguntas frecuentes desde el puerto', () => {
    expect(viewModel.isLoading()).toBe(false);
    expect(viewModel.errorMessage()).toBeNull();
    expect(viewModel.faqTitle()).toBe('FAQ');
    expect(viewModel.faqs().length).toBeGreaterThan(0);
  });
});
