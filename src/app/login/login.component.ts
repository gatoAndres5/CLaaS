import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserRoleService } from '../user-role.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private router: Router,private userRoleService: UserRoleService) { }

  login(): void {
    if (this.username === "s" && this.password === "p") {
      console.log('Student login successful!');
      // Perform the desired actions for a successful student login
      this.userRoleService.userRole = "Student";
      this.router.navigate(['/user-agreement']); // Redirect to the home page or any other desired route
    } 
    else if (this.username === "a" && this.password === "p") {
      console.log('Admin login successful!');
      this.userRoleService.userRole = "Administrator";
      // Perform the desired actions for a successful admin login
      
      this.router.navigate(['/user-agreement']); // Redirect to the home page or any other desired route
    }
    else if (this.username === "p" && this.password === "p") {
      console.log('Professor login successful!');
      this.userRoleService.userRole = "Professor";
      // Perform the desired actions for a successful professor login
      
      this.router.navigate(['/user-agreement']); // Redirect to the home page or any other desired route
    }
    else {
      console.log('Invalid username or password!');
      // Perform the desired actions for an invalid login, such as displaying an error message
    }
  }
}


