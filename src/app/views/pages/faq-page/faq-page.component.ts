import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FaqViewModel } from '@view-models';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './faq-page.component.html',
  styleUrl: './faq-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqPageComponent implements OnInit {
  protected readonly viewModel = inject(FaqViewModel);

  ngOnInit(): void {
    void this.viewModel.initialize();
  }
}
