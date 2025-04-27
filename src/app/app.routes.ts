import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dog-search/presentation/dog-search.component')
          .then(m => m.DogSearchComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./features/favorites/presentation/favorites.component')
          .then(m => m.FavoritesComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/presentation/settings.component')
          .then(m => m.SettingsComponent)
      }
    ]
  }
];
