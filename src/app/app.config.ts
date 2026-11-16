import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAvexykArchetype } from '@ioc';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideAvexykArchetype({
      contentBaseAddress: '/content',
      defaultColorMode: 'dark',
      colorModeStorageKey: 'colorMode',
      defaultToastDurationMs: 1500,
    }),
  ],
};
