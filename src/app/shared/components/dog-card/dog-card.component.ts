import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DogSearchResult } from '@models/dog.types';

@Component({
  selector: 'app-dog-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="w-full h-full flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img [src]="dog.imageUrl" [alt]="dog.breed" class="w-full h-48 object-cover rounded-t-lg">
      <mat-card-content class="p-4 flex-grow">
        <h3 class="text-lg font-semibold text-gray-800">{{ dog.breed | titlecase }}</h3>
        <p *ngIf="dog.subBreed" class="text-sm text-gray-600">{{ dog.subBreed | titlecase }}</p>
      </mat-card-content>
      <mat-card-actions class="p-4 flex justify-end">
        <button mat-icon-button color="primary" (click)="onFavorite()">
          <mat-icon>favorite_border</mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: []
})
export class DogCardComponent {
  @Input() dog!: DogSearchResult;

  onFavorite(): void {
    // TODO: Implement favorite functionality
  }
} 