import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DogDisplayComponent } from './components/dog-display/dog-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DogDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Dog API';
}
