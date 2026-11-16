import { Routes } from '@angular/router';
import { FaqPageComponent, HomePageComponent } from '@views';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'faq',
    component: FaqPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
