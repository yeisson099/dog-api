import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
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
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  templateUrl: './dog-search.component.html',
  styles: []
})
export class DogSearchComponent implements OnInit {
  private readonly dogApiService = inject(DogApiService);
  protected readonly store = inject(DogStore);
  private readonly destroyRef = inject(DestroyRef);

  searchQuery = '';
  searchSubject = new Subject<string>();
  searchResults = signal<DogSearchResult[]>([]);
  loading = this.dogApiService.loading;
  error = this.dogApiService.error;

  constructor() {
    this.setupSearch();
  }

  ngOnInit(): void {
    this.loadRandomDogs();
  }

  private loadRandomDogs(): void {
    this.dogApiService.getRandomDogs(10)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (results) => {
          this.searchResults.set(results);
          this.store.updateSearchResults(results);
        }
      });
  }

  private setupSearch(): void {
    this.searchSubject.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) => this.dogApiService.searchDogs(query))
    ).subscribe({
      next: (results) => {
        this.searchResults.set(results);
        this.store.updateSearchResults(results);
      }
    });
  }
}