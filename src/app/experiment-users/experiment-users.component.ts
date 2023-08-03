import { Component, OnInit } from '@angular/core';
import { Experiment } from '../experiment.model';
import { ExperimentService } from '../experiment.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-experiment-users',
  templateUrl: './experiment-users.component.html',
  styleUrls: ['./experiment-users.component.css']
})
export class ExperimentUsersComponent implements OnInit {
  selectedExperimentId: number | null = null;
  experiments: Experiment[] = [];
  users: User[] = [];

  constructor(
    private experimentService: ExperimentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Fetch the experiments and users from their respective services when the component initializes
    this.fetchExperiments();
    this.fetchUsers();
  }

  fetchExperiments() {
    // Call the experiment service to get the list of experiments
    this.experimentService.getExperiments().subscribe((experiments: Experiment[]) => {
      this.experiments = experiments;
    });
  }

  fetchUsers() {
    // Call the user service to get the list of users
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      console.log('Users fetched:',users);
    });
  }

  isUserInExperiment(user: User, experiment: Experiment): boolean {
    // Check if the user's experiments array contains the experiment's ID
    return user.experiments.includes(experiment.name);
  }

  toggleUserInExperiment(user: User, experiment: Experiment) {
    console.log(`Before toggle: User '${user.username}' experiments:`, user.experiments);
    
    if (this.isUserInExperiment(user, experiment)) {
      // If the user is associated with the experiment, remove the experiment name from the user's experiments array
      user.experiments = user.experiments.filter(expName => expName !== experiment.name);
    } else {
      // If the user is not associated with the experiment, add the experiment name to the user's experiments array
      user.experiments.push(experiment.name);
    }
  
    console.log(`After toggle: User '${user.username}' experiments:`, user.experiments);
  
    // Save the updated user data using the user service
    this.userService.saveUser(user);
  }
  

  updateUserExperiments(user: User): void {
    console.log(`Before update: User '${user.username}' experiments:`, user.experiments);
  
    // Find the selected experiments based on their names
    const selectedExperiments = this.experiments.filter(experiment =>
      this.isUserInExperiment(user, experiment)
    );
  
    // Update the user's experiments array with the selected experiment names
    user.experiments = selectedExperiments.map(experiment => experiment.name);
    
  
    console.log(`After update: User '${user.username}' experiments:`, user.experiments);
  }
  
  updateExperimentUsers(experiment: Experiment) {
    // Filter the users based on the selected experiment
    const selectedUsers = this.users.filter((user) =>
      this.isUserInExperiment(user, experiment)
    );
  
    // Update the selected users with the experiment
    for (const user of selectedUsers) {
      // Add the selected experiment to the user's experiments array if it's not already there
      if (!user.experiments.includes(experiment.name)) {
        user.experiments.push(experiment.name);
        this.userService.saveUser(user);
        console.log(`User '${user.username}' updated for experiment '${experiment.name}'`);
      }
    }
  
    // Print the updated users array after updating the experiment users
    console.log('Updated users array:', this.users);
  
    console.log(`Experiment users for '${experiment.name}' updated successfully!`);
  }
  
}


