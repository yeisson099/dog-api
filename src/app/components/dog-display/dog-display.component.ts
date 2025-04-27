import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DogService } from '../../services/dog.service';

@Component({
  selector: 'app-dog-display',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './dog-display.component.html',
  styleUrls: ['./dog-display.component.scss']
})
export class DogDisplayComponent implements OnInit {
  dogImage: string = '';

  constructor(private dogService: DogService) {}

  ngOnInit(): void {
    this.loadNewDog();
  }

  loadNewDog(): void {
    this.dogService.getRandomDog().subscribe({
      next: (response) => {
        this.dogImage = response.message;
      },
      error: (error) => {
        console.error('Error loading dog image:', error);
      }
    });
  }
}
