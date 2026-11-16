import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { AvexykOptions, provideBusinessObjects } from '@business-objects';
import { provideGateways } from '@gateways';
import { provideViewModels } from '@view-models';

export function provideAvexykArchetype(options: AvexykOptions): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideBusinessObjects(options),
    provideGateways(options.useFakes ?? false),
    provideViewModels(),
  ]);
}
