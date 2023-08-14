import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserRoleService } from '../user-role.service';
import { LogoutService } from '../logout.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoggedOut: boolean = false;
  incorrectLogin: boolean = false;
  constructor(private router: Router,private userRoleService: UserRoleService,private logoutService: LogoutService,private userService: UserService) { }

  ngOnInit(): void {
    this.logoutService.logoutStatus$.subscribe((loggedOut: boolean) => {
      this.isLoggedOut = loggedOut;
    });
    this.incorrectLogin = false;
  }
  
  login(): void {
    // Use the userService to authenticate the user
    const user = this.userService.authenticateUser(this.username, this.password);

    if (user) {
      // If the user is authenticated, perform the desired actions based on the user's role
      console.log(`User login successful! User role: ${user.accountType}`);
      this.userRoleService.userRole = user.accountType;

      // Redirect to the home page or any other desired route
      this.router.navigate(['/user-agreement']);
    } 
    else if(this.username === "a" && this.password === "p"){ //delete this later
      console.log('Admin login successful!');
      this.userRoleService.userRole = "Administrator"; 
      this.router.navigate(['/user-agreement']);
    }
    else {
      console.log('Invalid username or password!');
      this.incorrectLogin = true;
      // Perform the desired actions for an invalid login, such as displaying an error message
    }
  }
}


