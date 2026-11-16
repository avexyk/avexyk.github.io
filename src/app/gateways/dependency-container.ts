import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import {
  IColorModeGateway,
  IQuotesModel,
  ISiteContentModel,
} from '@business-objects';
import { LocalStorageColorModeGatewayFake } from './fakes/local-storage-color-mode.gateway.fake';
import { QuotesModelFake } from './fakes/quotes.model.fake';
import { SiteContentModelFake } from './fakes/site-content.model.fake';
import { LocalStorageColorModeGateway } from './local-storage-color-mode.gateway';
import { QuotesModel } from './quotes.model';
import { SiteContentModel } from './site-content.model';

export function provideGateways(useFakes = false): EnvironmentProviders {
  if (useFakes) {
    return makeEnvironmentProviders([
      { provide: ISiteContentModel, useClass: SiteContentModelFake },
      { provide: IQuotesModel, useClass: QuotesModelFake },
      { provide: IColorModeGateway, useClass: LocalStorageColorModeGatewayFake },
    ]);
  }

  return makeEnvironmentProviders([
    { provide: ISiteContentModel, useClass: SiteContentModel },
    { provide: IQuotesModel, useClass: QuotesModel },
    { provide: IColorModeGateway, useClass: LocalStorageColorModeGateway },
  ]);
}
