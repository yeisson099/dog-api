// src/app/core/services/dog-api.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap, catchError, forkJoin, of } from 'rxjs';
import { DogBreed, DogBreedsResponse, DogImage, DogSearchResult } from '@models/dog.types';

interface DogBreedsApiResponse {
  message: Record<string, string[]>;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class DogApiService {
  private readonly API_URL = 'https://dog.ceo/api';
  private readonly breedsSignal = signal<DogBreed[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  private readonly http = inject(HttpClient);

  constructor() {
    this.loadBreeds();
  }

  get breeds() {
    return this.breedsSignal.asReadonly();
  }

  get loading() {
    return this.loadingSignal.asReadonly();
  }

  get error() {
    return this.errorSignal.asReadonly();
  }

  private loadBreeds(): void {
    this.loadingSignal.set(true);
    this.http.get<DogBreedsApiResponse>(`${this.API_URL}/breeds/list/all`)
      .pipe(
        tap(() => this.errorSignal.set(null)),
        map(response => {
          return Object.entries(response.message).map(([name, subBreeds]) => ({
            name,
            subBreeds
          }));
        }),
        tap({
          next: (breeds) => {
            this.breedsSignal.set(breeds);
            this.loadingSignal.set(false);
          },
          error: (error) => {
            this.errorSignal.set('Error loading dog breeds');
            this.loadingSignal.set(false);
            console.error('Error loading breeds:', error);
          }
        }),
        catchError(error => {
          console.error('Failed to load breeds:', error);
          this.errorSignal.set('Failed to load dog breeds.');
          this.loadingSignal.set(false);
          return of([]);
        })
      )
      .subscribe();
  }

  getDogImage(breed: string, subBreed?: string): Observable<string> {
    const path = subBreed ? `${breed}/${subBreed}` : breed;
    return this.http.get<DogImage>(`${this.API_URL}/breed/${path}/images/random`)
      .pipe(
        map(response => response.message),
        catchError(error => {
          console.error(`Error fetching image for ${breed} ${subBreed || ''}:`, error);
          return of(''); // Emitir un string vacío en caso de error
        })
      );
  }

  getRandomDogs(count: number): Observable<DogSearchResult[]> {
    return this.http.get<{ message: string[] }>(`${this.API_URL}/breeds/image/random/${count}`)
      .pipe(
        map(response => response.message.map(url => {
          const parts = url.split('/');
          const breed = parts[parts.length - 2];
          return {
            breed,
            imageUrl: url
          };
        })),
        catchError(error => {
          console.error('Error fetching random dogs:', error);
          return of([]);
        })
      );
  }

  searchDogs(query: string): Observable<DogSearchResult[]> {
    const breeds = this.breedsSignal();
    const lowerCaseQuery = query.toLowerCase();

    const matchingBreeds = breeds.filter(breed =>
      breed.name.toLowerCase().includes(lowerCaseQuery) ||
      breed.subBreeds.some(subBreed => subBreed.toLowerCase().includes(lowerCaseQuery))
    );

    if (matchingBreeds.length === 0) {
      return of([]);
    }

    const imageRequests: Observable<DogSearchResult | null>[] = matchingBreeds.flatMap(breed => {
      if (breed.subBreeds.length > 0) {
        return breed.subBreeds.map(subBreed =>
          this.getDogImage(breed.name, subBreed).pipe(
            map(imageUrl => ({
              breed: breed.name,
              subBreed,
              imageUrl
            })),
            catchError(() => of(null))
          )
        );
      } else {
        return [this.getDogImage(breed.name).pipe(
          map(imageUrl => ({
            breed: breed.name,
            imageUrl
          })),
          catchError(() => of(null))
        )];
      }
    });

    return forkJoin(imageRequests).pipe(
      map(results => results.filter(result => result !== null) as DogSearchResult[])
    );
  }
}