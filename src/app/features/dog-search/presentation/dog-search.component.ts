import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DogApiService } from '../data/dog-api.service';
import { DogSearchResult } from '@models/dog.types';
import { DogCardComponent } from '@components/dog-card/dog-card.component';
import { DogStore } from '@core/store/dog.store';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dog-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DogCardComponent
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto mb-8">
        <div class="relative">
          <mat-form-field class="w-full">
            <mat-label>Search dog breeds</mat-label>
            <input
              matInput
              [(ngModel)]="searchQuery"
              (ngModelChange)="searchSubject.next($event)"
              placeholder="Type to search..."
              class="w-full"
            >
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @if (loading()) {
          <div class="col-span-full flex justify-center items-center py-8">
            <mat-spinner></mat-spinner>
          </div>
        } @else if (error()) {
          <div class="col-span-full text-center text-red-500 py-8">
            {{ error() }}
          </div>
        } @else if (searchResults().length === 0) {
          <div class="col-span-full text-center text-gray-500 py-8">
            No results found. Try a different search term.
          </div>
        } @else {
          @for (dog of searchResults(); track dog.breed + (dog.subBreed || '')) {
            <app-dog-card 
              [dog]="dog"
              [isFavorite]="store.isFavorite(dog)"
              (favoriteToggle)="store.toggleFavorite(dog)"
            ></app-dog-card>
          }
        }
      </div>
    </div>
  `,
  styles: []
})
export class DogSearchComponent implements OnInit {
  private readonly dogApiService = inject(DogApiService);
  protected readonly store = inject(DogStore);
  
  searchQuery = '';
  searchSubject = new Subject<string>();
  searchResults = signal<DogSearchResult[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.setupSearch();
  }

  ngOnInit(): void {
    this.loadRandomDogs();
  }

  private loadRandomDogs(): void {
    this.loading.set(true);
    // Hacer 4 llamadas para obtener 12 imágenes (3 por llamada)
    const requests = Array(4).fill(null).map(() => 
      this.dogApiService.getRandomDogs(3)
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        const allDogs = results.flat();
        this.searchResults.set(allDogs);
        this.store.updateSearchResults(allDogs);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Error loading random dogs');
        this.loading.set(false);
      }
    });
  }

  private setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        this.loading.set(true);
        this.error.set(null);
        return this.dogApiService.searchDogs(query);
      })
    ).subscribe({
      next: (results) => {
        this.searchResults.set(results);
        this.store.updateSearchResults(results);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Error searching for dogs');
        this.loading.set(false);
      }
    });
  }
} 