import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DogApiService } from '../../../../core/services/dog-api.service';
import { DogSearchResult } from '../../../../core/types/dog.types';
import { DogCardComponent } from '../../../../shared/components/dog-card/dog-card.component';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
            <app-dog-card [dog]="dog"></app-dog-card>
          }
        }
      </div>
    </div>
  `,
  styles: []
})
export class DogSearchComponent {
  private readonly dogApiService = inject(DogApiService);
  
  searchQuery = '';
  searchSubject = new Subject<string>();
  searchResults = signal<DogSearchResult[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.setupSearch();
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
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Error searching for dogs');
        this.loading.set(false);
      }
    });
  }
} 