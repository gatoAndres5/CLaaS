import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-bar',
  templateUrl: './task-bar.component.html',
  styleUrls: ['./task-bar.component.css']
})
export class TaskBarComponent implements OnInit {
  @Input() showTaskBar: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check the current route
    this.showTaskBar = this.router.url !== '/login';
  }
}
