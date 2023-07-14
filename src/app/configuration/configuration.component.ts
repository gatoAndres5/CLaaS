import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {

  username: string = '';
  password: string = '';
  constructor(private router: Router) { }

  login(): void {
    
  }
}
