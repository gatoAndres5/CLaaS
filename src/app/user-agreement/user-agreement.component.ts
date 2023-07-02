import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.css']
})
export class UserAgreementComponent {
  constructor(private router: Router) {}

acceptUserAgreement(): void {
  // Perform any necessary actions when the user accepts the agreement
  console.log('User Agreement accepted!');
  this.router.navigate(['/home']); // Redirect to the home page
}
}
