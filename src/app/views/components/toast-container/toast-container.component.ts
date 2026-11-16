import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { INotificationService } from '@business-objects';
import { ToastVariant } from '@entities';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastContainerComponent {
  protected readonly notificationService = inject(INotificationService);

  protected getVariantClasses(variant: ToastVariant): string {
    switch (variant) {
      case 'home':
        return 'bg-[#be185d]';
      case 'header':
        return 'bg-[#4338ca]';
      case 'footer':
        return 'bg-[#b45309]';
      default:
        return 'bg-[#2f96b4]';
    }
  }
}
