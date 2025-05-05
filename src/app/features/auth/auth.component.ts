import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import awsconfig from '../../../../aws-exports';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, AmplifyAuthenticatorModule],
  template: `
    <div class="mt-16">
     <amplify-authenticator [loginMechanisms]="['email']" [signUpAttributes]="['email']" [formFields]="formFields">
        <ng-template
          amplifySlot="authenticated"
          let-user="user"
          let-signOut="signOut"
        >
        </ng-template>
      </amplify-authenticator>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})

export class AuthComponent {
  authenticator = inject(AuthenticatorService)
  router = inject(Router)

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

  constructor() {
    this.authenticator.subscribe(({ authStatus }) => {
      if (authStatus === 'authenticated') {
        this.router.navigate(['/']);
      }
    });
  }
} 