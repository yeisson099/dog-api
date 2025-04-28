import { Routes } from '@angular/router';

export interface NavigationItem {
  path: string;
  title: string;
  icon: string;
}

export const navigationItems: NavigationItem[] = [
  {
    path: '/',
    title: 'Home',
    icon: 'home'
  },
  {
    path: '/favorites',
    title: 'Favorites',
    icon: 'favorite'
  }
]; 