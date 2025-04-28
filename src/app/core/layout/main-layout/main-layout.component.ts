import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { navigationItems } from '../../config/navigation.config';
import { routeAnimations } from '../../animations/route-animations';
import { RouterOutlet } from '@angular/router';
import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import awsconfig from '../../../../aws-exports';

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
    MatListModule,
    RouterOutlet
  ],
  template: `
    <div class="h-screen flex flex-col">
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

        <mat-sidenav-content class="flex flex-col">
          <mat-toolbar color="primary" class="fixed top-0 z-50 w-[calc(100%-64px)]">
            <button mat-icon-button (click)="sidenav.toggle()">
              <mat-icon>menu</mat-icon>
            </button>
            <span class="ml-4 text-xl font-bold cursor-pointer" routerLink="/">DogFinder</span>
          </mat-toolbar>

          <div class="flex-grow overflow-auto mt-6" [@routeAnimations]>
            <router-outlet></router-outlet>
          </div>

          <footer class="bg-gray-100 py-4 fixed bottom-0 w-[calc(100%)]">
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
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  animations: [routeAnimations],
  styles: [`
    .main-layout {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class MainLayoutComponent {
  protected readonly navigationItems = navigationItems;

  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsconfig);
  }
} 