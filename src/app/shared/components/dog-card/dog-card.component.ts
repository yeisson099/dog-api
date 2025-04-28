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
    <mat-card class="dog-card">
      <div class="dog-card__image">
        <img 
          [src]="dog.imageUrl" 
          [alt]="dog.breed" 
        >
        <button 
          mat-icon-button 
          class="dog-card__favorite-button"
          [class.favorite]="isFavorite"
          (click)="onFavoriteToggle()"
        >
          <mat-icon>
            {{ isFavorite ? 'favorite' : 'favorite_border' }}
          </mat-icon>
        </button>
      </div>
      
      <mat-card-content class="dog-card__content">
        <h3>{{ dog.breed | titlecase }}</h3>
        @if (dog.subBreed) {
          <p>{{ dog.subBreed | titlecase }}</p>
        }
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./dog-card.component.scss']
})
export class DogCardComponent {
  @Input() dog!: DogSearchResult;
  @Input() isFavorite = false;
  @Output() favoriteToggle = new EventEmitter<void>();

  onFavoriteToggle(): void {
    this.favoriteToggle.emit();
  }
} 