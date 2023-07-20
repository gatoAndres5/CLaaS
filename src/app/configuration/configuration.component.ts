import { Component, OnInit } from '@angular/core';
import { Experiment } from '../experiment.model';
import { ExperimentService } from '../experiment.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  experiments: Experiment[] = [];
  username: string ='';
  password: string = '';
  login(){

  }
  experimentName: string ='';
  experimentDescription: string = '';

  constructor(private experimentService: ExperimentService) {}

  ngOnInit() {
    // Fetch the experiments from the service when the component initializes
    this.fetchExperiments();
  }

  fetchExperiments() {
    // Call the experiment service to get the list of experiments
    this.experimentService.getExperiments().subscribe((experiments: Experiment[]) => {
      this.experiments = experiments;
    });
  }

  deleteExperiment(experimentId: number) {
    // Call the experiment service to delete the experiment
    this.experimentService.deleteExperiment(experimentId).subscribe(() => {
      // Remove the deleted experiment from the local array
      this.experiments = this.experiments.filter((experiment) => experiment.id !== experimentId);
    });
  }

  setUsers(experimentId: number) {
    // Implement the logic to set users for the experiment
    // This might involve showing a modal or navigating to a new page
    console.log(`Set users for experiment with ID: ${experimentId}`);
  }
  saveExperiment():void{

  }
}

