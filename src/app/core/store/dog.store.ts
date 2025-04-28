import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { DogSearchResult } from '@models/dog.types';

@Injectable({
  providedIn: 'root'
})
export class DogStore {
  private readonly searchQuery = signal<string>('');
  private readonly favorites = signal<DogSearchResult[]>([]);
  private readonly searchResults = signal<DogSearchResult[]>([]);

  // Expose readonly signals
  readonly searchQuery$ = this.searchQuery.asReadonly();
  readonly favorites$ = this.favorites.asReadonly();
  readonly searchResults$ = this.searchResults.asReadonly();

  // Methods to update state
  updateSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  updateSearchResults(results: DogSearchResult[]): void {
    this.searchResults.set(results);
  }

  toggleFavorite(dog: DogSearchResult): void {
    const currentFavorites = this.favorites();
    const isFavorite = currentFavorites.some(
      fav => fav.breed === dog.breed && fav.subBreed === dog.subBreed
    );

    if (isFavorite) {
      this.favorites.set(
        currentFavorites.filter(
          fav => !(fav.breed === dog.breed && fav.subBreed === dog.subBreed)
        )
      );
    } else {
      this.favorites.set([...currentFavorites, dog]);
    }
  }

  isFavorite(dog: DogSearchResult): boolean {
    return this.favorites().some(
      fav => fav.breed === dog.breed && fav.subBreed === dog.subBreed
    );
  }
} 