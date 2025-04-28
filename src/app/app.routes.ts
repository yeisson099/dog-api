import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { AuthComponent } from './features/auth/auth.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
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
      }
    ]
  }
];
