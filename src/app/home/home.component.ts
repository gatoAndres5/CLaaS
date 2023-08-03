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
  availableExperiments: string[] = [];

  constructor(
    private experimentService: ExperimentService,
    private userRoleService: UserRoleService,
    private userService: UserService,
    
  ) {} 
  

  ngOnInit(): void {
    this.userRole = this.userRoleService.userRole; // Get the user role from the service
    this.fetchExperiments();
    this.fetchLoggedInUser();
    
  }
  ngAfterViewChecked(): void {
    this.fetchLoggedInUser();
  }

  fetchExperiments() {
    this.experimentService.getExperiments().subscribe((experiments: Experiment[]) => {
      this.experiments = experiments;
      console.log('Experiments fetched:', experiments);

    });
  }

  fetchLoggedInUser() {
    // Assuming the UserService has a method to fetch the currently logged-in user
    this.userService.getLoggedInUser().subscribe((user: User | null) => {
      this.loggedInUser = user || undefined;
      this.updateAvailableExperiments();
      console.log("Logged In User:",this.loggedInUser);
    });

  }
  updateAvailableExperiments() {
    if (this.loggedInUser) {
      // Filter the experiments based on the user's experiments array
      const availableExperiments = this.experiments.filter((experiment) =>
        this.loggedInUser?.experiments.includes(experiment.name)
      );
      this.availableExperiments = availableExperiments.map((experiment) => experiment.name);
    } else {
      this.availableExperiments = [];
    }
  }

  getAvailableExperimentNames(): string[] {
    if (this.loggedInUser) {
      // Filter the experiments based on the user's experiments array
      const availableExperiments = this.experiments.filter((experiment) =>
        this.loggedInUser?.experiments.includes(experiment.name)
      );
      console.log('Available experiments:', availableExperiments);
      return availableExperiments.map((experiment) => experiment.name);
    } else {
      return [];
    }
  }
  getExperimentDescription(experimentName: string): string | undefined {
    const experiment = this.experiments.find((exp) => exp.name === experimentName);
    return experiment ? experiment.description : undefined;
  }
  
}


