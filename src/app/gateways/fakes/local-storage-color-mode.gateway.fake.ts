import { Injectable, signal } from '@angular/core';
import { IColorModeGateway } from '@business-objects';
import { ColorMode } from '@entities';
import { Result, success } from '@libraries/result-entities';

@Injectable()
export class LocalStorageColorModeGatewayFake implements IColorModeGateway {
  private readonly modeSignal = signal<ColorMode>('dark');
  readonly currentMode = this.modeSignal.asReadonly();

  initializeColorMode(): Result<ColorMode, string> {
    return success(this.modeSignal());
  }

  toggleColorMode(): Result<ColorMode, string> {
    const nextMode: ColorMode = this.modeSignal() === 'dark' ? 'light' : 'dark';
    this.modeSignal.set(nextMode);
    return success(nextMode);
  }
}
