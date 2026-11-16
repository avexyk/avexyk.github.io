import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { FaqViewModel } from './faq.view-model';
import { FooterViewModel } from './footer.view-model';
import { HeaderViewModel } from './header.view-model';
import { HomeViewModel } from './home.view-model';

export function provideViewModels(): EnvironmentProviders {
  return makeEnvironmentProviders([
    HeaderViewModel,
    HomeViewModel,
    FaqViewModel,
    FooterViewModel,
  ]);
}
