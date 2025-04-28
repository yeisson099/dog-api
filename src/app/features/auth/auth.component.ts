import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, AmplifyAuthenticatorModule],
  template: `
     <amplify-authenticator [loginMechanisms]="['email']" [signUpAttributes]="['email']" [formFields]="formFields">
      <ng-template
        amplifySlot="authenticated"
        let-user="user"
        let-signOut="signOut"
      >
        <h1>Welcome {{ user.username }}!</h1>
        <button (click)="signOut()">Sign Out</button>
      </ng-template>
    </amplify-authenticator>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})

export class AuthComponent {
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
} 