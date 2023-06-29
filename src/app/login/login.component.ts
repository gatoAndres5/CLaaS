import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  login(): void {
    // Perform login logic here
    // You can access the entered username and password using this.username and this.password
    // Example: Send a request to the backend API to validate the credentials
    if (this.username == "user"){

    }
    console.log('Login clicked!');
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.router.navigate(['/home']);
  }
}

