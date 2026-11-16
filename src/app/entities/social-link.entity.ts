export type SocialPlatformId = 'linkedin' | 'lastfm' | 'youtube' | 'github' | 'twitter' | 'instagram';

export interface SocialLink {
  readonly id: SocialPlatformId;
  readonly label: string;
  readonly url: string;
  readonly hoverColorClasses: string;
}
