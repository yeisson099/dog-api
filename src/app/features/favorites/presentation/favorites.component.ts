import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DogCardComponent } from '@components/dog-card/dog-card.component';
import { DogStore } from '@core/store/dog.store';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MatCardModule, DogCardComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-6">Favorite Dogs</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @if (store.favorites$().length === 0) {
          <p class="col-span-full text-center text-gray-500 py-8">
            No favorites yet. Start adding some dogs to your favorites!
          </p>
        } @else {
          @for (dog of store.favorites$(); track dog.breed + (dog.subBreed || '')) {
            <app-dog-card 
              [dog]="dog"
              [isFavorite]="true"
              (favoriteToggle)="store.toggleFavorite(dog)"
            ></app-dog-card>
          }
        }
      </div>
    </div>
  `,
  styles: []
})
export class FavoritesComponent {
  protected readonly store = inject(DogStore);
} 