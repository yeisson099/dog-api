import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { MainLayoutComponent } from '@core/layout/main-layout/main-layout.component';
import awsconfig from '../aws-exports';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AmplifyAuthenticatorModule, MainLayoutComponent],
  template: `
    @if (authenticator.authStatus === 'authenticated') {
      <app-main-layout></app-main-layout>
    } @else {
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="p-8 space-y-8 bg-white rounded-lg shadow">
          <amplify-authenticator [loginMechanisms]="['email']" [signUpAttributes]="['email']" [formFields]="formFields">
            <ng-template
              amplifySlot="authenticated"
              let-user="user"
              let-signOut="signOut"
            >
            </ng-template>
          </amplify-authenticator>
        </div>
      </div>
    }
  `,
  styles: []
})
export class AppComponent {
  formFields = {
    signUp: {
      email: {
        order: 1,
        isRequired: true
      },
      password: {
        order: 2,
        isRequired: true
      },
      confirm_password: {
        order: 3,
        isRequired: true
      }
    }
  };

  constructor(public authenticator: AuthenticatorService, private router: Router) {
    Amplify.configure(awsconfig);
    
    // Escuchar cambios en el estado de autenticación
    this.authenticator.subscribe(({ authStatus }) => {
      if (authStatus === 'authenticated') {
        this.router.navigate(['/']);
      }
    });
  }
}
