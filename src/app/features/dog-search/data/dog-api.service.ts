import { Injectable, inject, signal } from '@angular/core';
import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DogBreed, DogBreedsResponse, DogImage, DogSearchResult } from '../../../shared/models/dog.types';

@Injectable({
  providedIn: 'root'
})
export class DogApiService {
  private readonly API_URL = 'https://dog.ceo/api';
  private readonly breedsSignal = signal<DogBreed[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);
  
  private readonly http = inject(HttpClient);
  private readonly httpHandler = inject(HttpHandler);
  private readonly httpBackend = inject(HttpBackend);

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
    this.http.get<DogBreedsResponse>(`${this.API_URL}/breeds/list/all`)
      .pipe(
        map(response => {
          return Object.entries(response.message).map(([name, subBreeds]) => ({
            name,
            subBreeds
          }));
        })
      )
      .subscribe({
        next: (breeds) => {
          this.breedsSignal.set(breeds);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          this.errorSignal.set('Error loading dog breeds');
          this.loadingSignal.set(false);
        }
      });
  }

  getDogImage(breed: string, subBreed?: string): Observable<string> {
    const path = subBreed ? `${breed}/${subBreed}` : breed;
    return this.http.get<DogImage>(`${this.API_URL}/breed/${path}/images/random`)
      .pipe(
        map(response => response.message)
      );
  }

  searchDogs(query: string): Observable<DogSearchResult[]> {
    const searchResults: DogSearchResult[] = [];
    const breeds = this.breedsSignal();

    return new Observable<DogSearchResult[]>(observer => {
      const matchingBreeds = breeds.filter(breed => 
        breed.name.toLowerCase().includes(query.toLowerCase()) ||
        breed.subBreeds.some(subBreed => subBreed.toLowerCase().includes(query.toLowerCase()))
      );

      if (matchingBreeds.length === 0) {
        observer.next([]);
        observer.complete();
        return;
      }

      let completedRequests = 0;
      matchingBreeds.forEach(breed => {
        if (breed.subBreeds.length > 0) {
          breed.subBreeds.forEach(subBreed => {
            this.getDogImage(breed.name, subBreed).subscribe({
              next: (imageUrl) => {
                searchResults.push({
                  breed: breed.name,
                  subBreed,
                  imageUrl
                });
                completedRequests++;
                if (completedRequests === matchingBreeds.reduce((acc, curr) => acc + curr.subBreeds.length, 0)) {
                  observer.next(searchResults);
                  observer.complete();
                }
              },
              error: () => {
                completedRequests++;
                if (completedRequests === matchingBreeds.reduce((acc, curr) => acc + curr.subBreeds.length, 0)) {
                  observer.next(searchResults);
                  observer.complete();
                }
              }
            });
          });
        } else {
          this.getDogImage(breed.name).subscribe({
            next: (imageUrl) => {
              searchResults.push({
                breed: breed.name,
                imageUrl
              });
              completedRequests++;
              if (completedRequests === matchingBreeds.reduce((acc, curr) => acc + curr.subBreeds.length, 0)) {
                observer.next(searchResults);
                observer.complete();
              }
            },
            error: () => {
              completedRequests++;
              if (completedRequests === matchingBreeds.reduce((acc, curr) => acc + curr.subBreeds.length, 0)) {
                observer.next(searchResults);
                observer.complete();
              }
            }
          });
        }
      });
    });
  }
} 