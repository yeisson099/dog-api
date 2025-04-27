import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSlideToggleModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-6">Settings</h1>
      <mat-card class="max-w-2xl mx-auto">
        <mat-card-content class="p-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-lg">Dark Mode</span>
              <mat-slide-toggle [(ngModel)]="darkMode">
                Toggle dark mode
              </mat-slide-toggle>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-lg">Notifications</span>
              <mat-slide-toggle [(ngModel)]="notifications">
                Enable notifications
              </mat-slide-toggle>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: []
})
export class SettingsComponent {
  darkMode = false;
  notifications = true;
} 