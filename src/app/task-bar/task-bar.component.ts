import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from '../user-role.service';
import { LogoutService } from '../logout.service';
import { UserService } from '../user.service';



@Component({
  selector: 'app-task-bar',
  templateUrl: './task-bar.component.html',
  styleUrls: ['./task-bar.component.css']
})
export class TaskBarComponent implements OnInit {
  @Input() showTaskBar: boolean = false;
  
  userRole: string = '';
  username: string = '';
  

  constructor(private router: Router,private userRoleService: UserRoleService,private logoutService:LogoutService,private userService: UserService) { }

  ngOnInit(): void {
    // Check the current route
    this.userRole = this.userRoleService.userRole;
    this.showTaskBar = this.router.url !== '/login';
  
    // Fetch the logged-in user from the UserService
    const loggedInUser = this.userService.getLoggedInUser();
    if (loggedInUser) {
      // If the user is logged in, set the username variable to the username of the logged-in user
      this.username = loggedInUser.username;
    } else {
      // If no user is logged in, set the username variable to an empty string
      this.username = '';
    }
  }
  
  
  
  
  
  logout(): void {
    // Perform any necessary actions to log out the user
    // For example, clearing session storage, resetting user data, etc.
    this.userRoleService.userRole = '';
    
    this.logoutService.setLogoutStatus(true);
    this.userService.logout();
    this.router.navigate(['/login']); // Redirect to the login screen
    
  }
  changePassword(): void{
    this.router.navigate(['/change-password']);
  }
  configure(): void{
    this.router.navigate(['/configuration']);
  }
  viewUsers(): void{
    this.router.navigate(['/viewUsers']);
  }
  viewSlides(): void{
    this.router.navigate(['/viewSlides']);
  }
  experimentUsers(): void{
    this.router.navigate(['/viewExperimentUsers']);
  }
  viewLogs(): void{
    this.router.navigate(['/configuration']);
  }
  phpInfo(): void{
    this.router.navigate(['/configuration']);
  }
}
