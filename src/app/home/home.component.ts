import { Component, OnInit } from '@angular/core';
import { ExperimentService } from '../experiment.service';
import { Experiment } from '../experiment.model';
import { UserRoleService } from '../user-role.service';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  experiments: Experiment[] = [];
  userRole: string = '';
  loggedInUser: User | undefined;

  constructor(
    private experimentService: ExperimentService,
    private userRoleService: UserRoleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userRole = this.userRoleService.userRole; // Get the user role from the service
    this.fetchExperiments();
    this.fetchLoggedInUser();
  }

  fetchExperiments() {
    this.experimentService.getExperiments().subscribe((experiments: Experiment[]) => {
      this.experiments = experiments;
    });
  }

  fetchLoggedInUser() {
    // Assuming the UserService has a method to fetch the currently logged-in user
    this.userService.getLoggedInUser().subscribe((user: User | null) => {
      this.loggedInUser = user || undefined;
    });
  }

  getAvailableExperimentNames(): string[] {
    if (this.loggedInUser) {
      // Filter the experiments based on the user's experiments array
      const availableExperiments = this.experiments.filter((experiment) =>
        this.loggedInUser?.experiments.includes(experiment.name)
      );
      return availableExperiments.map((experiment) => experiment.name);
    } else {
      return [];
    }
  }
}


