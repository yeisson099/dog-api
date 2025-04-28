import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DogSearchResult } from '@models/dog.types';

@Component({
  selector: 'app-dog-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card class="w-72 h-[400px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <div class="h-48 relative flex-shrink-0">
        <img 
          [src]="dog.imageUrl" 
          [alt]="dog.breed" 
          class="w-full h-full object-cover"
        >
      </div>
      
      <mat-card-content class="p-3 flex-grow">
        <h3 class="text-center font-bold text-lg text-gray-800">
          {{ dog.breed | titlecase }}
        </h3>
        @if (dog.subBreed) {
          <p class="text-center text-sm text-gray-600 mt-1">
            {{ dog.subBreed | titlecase }}
          </p>
        }
      </mat-card-content>

      <mat-card-actions class="p-2 flex justify-end flex-shrink-0">
        <button 
          mat-icon-button 
          [class.text-red-500]="isFavorite"
          (click)="onFavoriteToggle()"
        >
          <mat-icon>
            {{ isFavorite ? 'favorite' : 'favorite_border' }}
          </mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: []
})
export class DogCardComponent {
  @Input() dog!: DogSearchResult;
  @Input() isFavorite = false;
  @Output() favoriteToggle = new EventEmitter<void>();

  onFavoriteToggle(): void {
    this.favoriteToggle.emit();
  }
} 