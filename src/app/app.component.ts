import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { MainLayoutComponent } from '@core/layout/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AmplifyAuthenticatorModule, MainLayoutComponent],
  template: `
      <app-main-layout></app-main-layout>
  `,
  styles: []
})
export class AppComponent {
}
