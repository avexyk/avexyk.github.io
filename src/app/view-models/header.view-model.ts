import { computed, inject, Injectable, signal } from '@angular/core';
import {
  IColorModeGateway,
  INotificationService,
  ISiteContentModel,
} from '@business-objects';
import { NavItem, SiteInfo, SocialLink } from '@entities';
import { handleResult } from '@libraries/result-entities';

@Injectable()
export class HeaderViewModel {
  private readonly siteContentModel = inject(ISiteContentModel);
  private readonly colorModeGateway = inject(IColorModeGateway);
  private readonly notificationService = inject(INotificationService);

  private readonly menuOpenSignal = signal<boolean>(false);
  private readonly siteInfoSignal = signal<SiteInfo | null>(null);
  private readonly navItemsSignal = signal<readonly NavItem[]>([]);
  private readonly socialLinksSignal = signal<readonly SocialLink[]>([]);

  readonly isMenuOpen = this.menuOpenSignal.asReadonly();
  readonly isDarkMode = computed(() => this.colorModeGateway.currentMode() === 'dark');
  readonly siteInfo = this.siteInfoSignal.asReadonly();
  readonly navItems = this.navItemsSignal.asReadonly();
  readonly socialLinks = this.socialLinksSignal.asReadonly();

  async initialize(): Promise<void> {
    this.colorModeGateway.initializeColorMode();
    const result = await this.siteContentModel.getSiteContent();
    handleResult(
      result,
      (content) => {
        this.siteInfoSignal.set(content.siteInfo);
        this.navItemsSignal.set(content.navItems);
        this.socialLinksSignal.set(content.socialLinks);
      },
      () => {
        this.notificationService.show('Error al cargar la navegación', 'header');
      }
    );
  }

  toggleTheme(): void {
    this.colorModeGateway.toggleColorMode();
  }

  toggleMenu(): void {
    this.menuOpenSignal.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpenSignal.set(false);
  }

  onNavItemClick(item: NavItem): void {
    this.menuOpenSignal.set(false);
    if (item.toastMessage.trim().length > 0) {
      this.notificationService.show(item.toastMessage, 'header');
    }
  }
}
