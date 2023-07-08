import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from '../user-role.service';



@Component({
  selector: 'app-task-bar',
  templateUrl: './task-bar.component.html',
  styleUrls: ['./task-bar.component.css']
})
export class TaskBarComponent implements OnInit {
  @Input() showTaskBar: boolean = false;
  @Input() username: string = '';
  userRole: string = '';
  

  constructor(private router: Router,private userRoleService: UserRoleService) { }

  ngOnInit(): void {
    // Check the current route
    this.userRole = this.userRoleService.userRole;
    this.showTaskBar = this.router.url !== '/login';
  }
  logout(): void {
    // Perform any necessary actions to log out the user
    // For example, clearing session storage, resetting user data, etc.
    this.userRoleService.userRole = '';
    this.router.navigate(['/login']); // Redirect to the login screen
  }
  
}
