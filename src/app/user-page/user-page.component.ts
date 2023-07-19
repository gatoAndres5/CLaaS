import { Component } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  showUserForm: boolean = false;
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  emailAddress: string = '';
  password: string = '';
  rePassword: string = '';

  toggleUserForm(): void {
    this.showUserForm = !this.showUserForm;
  }
}
