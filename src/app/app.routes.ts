import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/search/components/dog-search/dog-search.component')
          .then(m => m.DogSearchComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./features/favorites/components/favorites/favorites.component')
          .then(m => m.FavoritesComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/components/settings/settings.component')
          .then(m => m.SettingsComponent)
      }
    ]
  }
];
