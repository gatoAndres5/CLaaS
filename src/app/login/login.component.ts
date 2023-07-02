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
    if (this.username === "user" && this.password === "pass") {
      console.log('Login successful!');
      // Perform the desired actions for a successful login
      this.router.navigate(['/user-agreement']); // Redirect to the home page or any other desired route
    } else {
      console.log('Invalid username or password!');
      // Perform the desired actions for an invalid login, such as displaying an error message
    }
  }
  
}

