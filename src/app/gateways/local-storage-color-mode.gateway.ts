import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { AVEXYK_OPTIONS, IColorModeGateway } from '@business-objects';
import { ColorMode } from '@entities';
import { failure, Result, success } from '@libraries/result-entities';

@Injectable()
export class LocalStorageColorModeGateway implements IColorModeGateway {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly options = inject(AVEXYK_OPTIONS);

  private readonly modeSignal = signal<ColorMode>(this.options.defaultColorMode);
  readonly currentMode = this.modeSignal.asReadonly();

  initializeColorMode(): Result<ColorMode, string> {
    if (!isPlatformBrowser(this.platformId)) {
      return success(this.options.defaultColorMode);
    }
    try {
      const stored = localStorage.getItem(this.options.colorModeStorageKey);
      const resolved: ColorMode =
        stored === 'light' || stored === 'dark' ? stored : this.options.defaultColorMode;
      this.applyMode(resolved);
      return success(resolved);
    } catch (error) {
      return failure(`Error al inicializar ColorMode: ${String(error)}`);
    }
  }

  toggleColorMode(): Result<ColorMode, string> {
    const nextMode: ColorMode = this.modeSignal() === 'dark' ? 'light' : 'dark';
    if (!isPlatformBrowser(this.platformId)) {
      this.modeSignal.set(nextMode);
      return success(nextMode);
    }
    try {
      this.applyMode(nextMode);
      return success(nextMode);
    } catch (error) {
      return failure(`Error al alternar ColorMode: ${String(error)}`);
    }
  }

  private applyMode(mode: ColorMode): void {
    this.modeSignal.set(mode);
    const root = this.document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(this.options.colorModeStorageKey, mode);
  }
}
