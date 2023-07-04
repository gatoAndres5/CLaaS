import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoginPage: boolean = true;
  title = 'CLaaS';
  constructor(private router: Router) {}

  ngOnInit() {
    // Subscribe to router events to track the current path
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check the current path to determine if it's the login page
        this.isLoginPage = (event.urlAfterRedirects === '/login');
      }
    });
  }
}

  
  

