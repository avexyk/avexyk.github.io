import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AVEXYK_OPTIONS, ISiteContentModel } from '@business-objects';
import { SiteContent } from '@entities';
import { failure, Result, success } from '@libraries/result-entities';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SiteContentModel implements ISiteContentModel {
  private readonly http = inject(HttpClient);
  private readonly options = inject(AVEXYK_OPTIONS);

  private cachedContent$: Promise<Result<SiteContent, string>> | null = null;

  getSiteContent(): Promise<Result<SiteContent, string>> {
    if (!this.cachedContent$) {
      this.cachedContent$ = this.fetchSiteContent();
    }
    return this.cachedContent$;
  }

  private async fetchSiteContent(): Promise<Result<SiteContent, string>> {
    try {
      const base = this.options.contentBaseAddress.replace(/\/+$/, '');
      const content = await firstValueFrom(
        this.http.get<SiteContent>(`${base}/site-content.json`)
      );
      return success(content);
    } catch (error) {
      this.cachedContent$ = null;
      return failure(`Error al cargar el contenido del sitio: ${String(error)}`);
    }
  }
}
