import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { navigationItems } from '../../config/navigation.config';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  template: `
    <div class="min-h-screen flex flex-col">
      <mat-sidenav-container class="flex-grow">
        <mat-sidenav #sidenav mode="side" class="w-64">
          <mat-nav-list>
            @for (item of navigationItems; track item.path) {
              <a 
                mat-list-item 
                [routerLink]="item.path" 
                routerLinkActive="bg-gray-100"
              >
                <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                <span matListItemTitle>{{ item.title }}</span>
              </a>
            }
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <mat-toolbar color="primary" class="fixed top-0 z-50 w-[calc(100%-16rem)]">
            <button mat-icon-button (click)="sidenav.toggle()">
              <mat-icon>menu</mat-icon>
            </button>
            <span class="ml-4 text-xl font-bold">DogFinder</span>
          </mat-toolbar>

          <div class="mt-16">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>

      <footer class="bg-gray-100 py-4 mt-auto">
        <div class="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 DogFinder. All rights reserved.</p>
          <div class="mt-2">
            <a href="https://github.com/yourusername/dogfinder" target="_blank" class="text-indigo-600 hover:text-indigo-800 mx-2">
              GitHub
            </a>
            <a href="mailto:contact@dogfinder.com" class="text-indigo-600 hover:text-indigo-800 mx-2">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: []
})
export class MainLayoutComponent {
  protected readonly navigationItems = navigationItems;
} 