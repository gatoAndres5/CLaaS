import { Component } from '@angular/core';
import { Experiment } from '../experiment.model';
import { ExperimentService } from '../experiment.service';

// Create an interface for Experiment
interface UserExperiment extends Experiment {
  selected: boolean;
}



@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  showUserForm: boolean = false;
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  emailAddress: string = '';
  password: string = '';
  rePassword: string = '';
  userExperiments: UserExperiment[] = [];

  constructor(private experimentService: ExperimentService) {}

  ngOnInit() {
    this.fetchExperiments();
  }
  fetchExperiments() {
    this.experimentService.getExperiments().subscribe((experiments: Experiment[]) => {
      // Set selected property to false for each experiment initially
      this.userExperiments = experiments.map((experiment) => ({ ...experiment, selected: false }));
    });
  }
  selectedExperimentIds: number[] = []; // Array to store selected experiment IDs

  toggleUserForm(): void {
    this.showUserForm = !this.showUserForm;
  }
  isSelected(experimentId: number): boolean {
    return this.selectedExperimentIds.includes(experimentId);
  }
}

