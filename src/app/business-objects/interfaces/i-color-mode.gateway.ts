import { Signal } from '@angular/core';
import { ColorMode } from '@entities';
import { Result } from '@libraries/result-entities';

export abstract class IColorModeGateway {
  abstract readonly currentMode: Signal<ColorMode>;
  abstract initializeColorMode(): Result<ColorMode, string>;
  abstract toggleColorMode(): Result<ColorMode, string>;
}
