import { FaqEntry } from './faq-entry.entity';
import { NavItem } from './nav-item.entity';
import { Profile } from './profile.entity';
import { SiteInfo } from './site-info.entity';
import { SiteSection } from './site-section.entity';
import { SocialLink } from './social-link.entity';

export interface SiteContent {
  readonly siteInfo: SiteInfo;
  readonly profile: Profile;
  readonly navItems: readonly NavItem[];
  readonly socialLinks: readonly SocialLink[];
  readonly sections: readonly SiteSection[];
  readonly faqTitle: string;
  readonly faqs: readonly FaqEntry[];
}
