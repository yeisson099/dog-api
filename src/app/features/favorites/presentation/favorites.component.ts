import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DogCardComponent } from '../../../shared/components/dog-card/dog-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MatCardModule, DogCardComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-6">Favorite Dogs</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <p class="col-span-full text-center text-gray-500 py-8">
          No favorites yet. Start adding some dogs to your favorites!
        </p>
      </div>
    </div>
  `,
  styles: []
})
export class FavoritesComponent {} 