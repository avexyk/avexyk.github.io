import { SiteContent } from '@entities';
import { Result } from '@libraries/result-entities';

export abstract class ISiteContentModel {
  abstract getSiteContent(): Promise<Result<SiteContent, string>>;
}
