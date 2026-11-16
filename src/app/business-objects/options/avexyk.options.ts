import { InjectionToken } from '@angular/core';
import { ColorMode } from '@entities';

export interface AvexykOptions {
  readonly contentBaseAddress: string;
  readonly defaultColorMode: ColorMode;
  readonly colorModeStorageKey: string;
  readonly defaultToastDurationMs: number;
  readonly useFakes?: boolean;
}

export const AVEXYK_OPTIONS = new InjectionToken<AvexykOptions>('AVEXYK_OPTIONS');
