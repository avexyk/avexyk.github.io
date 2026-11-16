import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FooterViewModel } from '@view-models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  protected readonly viewModel = inject(FooterViewModel);

  ngOnInit(): void {
    void this.viewModel.initialize();
  }
}
