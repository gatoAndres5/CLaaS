import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Experiment } from '../experiment.model';
import { ExperimentService } from '../experiment.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit, OnDestroy {
  experiments: Experiment[] = [];
  username: string ='';
  password: string = '';
  login(){

  }
  experimentName: string ='';
  experimentDescription: string = '';
  isSavingExperiment = false;
  private experimentSubscription: Subscription | undefined;

  @ViewChild('experimentForm') experimentForm!: NgForm;

  constructor(private experimentService: ExperimentService) {}

  ngOnInit() {
    // Fetch the experiments from the service when the component initializes
    
      // Load experiments from local storage when the component initializes
    this.experimentService.loadFromLocalStorage();
    this.fetchExperiments();
    
  }

  fetchExperiments() {
    // Check if the experiments array is empty before fetching the data
  if (this.experiments.length > 0) {
    // Call the experiment service to get the list of experiments
    this.experimentService.getExperiments().subscribe((experiments: Experiment[]) => {
      this.experiments = experiments;
    });
  }
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
  saveExperiment(): void {
    if (this.isSavingExperiment || !this.experimentForm.valid) {
      return;
    }
  
    const isDuplicate = this.experiments.some((experiment) => experiment.name === this.experimentName);
  
    if (isDuplicate) {
      console.log('Experiment name already exists. Please choose a different name.');
      return;
    }
  
    this.isSavingExperiment = true;
    const newExperiment: Experiment = {
      id: 0,
      name: this.experimentName,
      description: this.experimentDescription,
      enabled: false,
      addedOn: new Date(),
      lastModified: new Date(),
    };
  
    this.experimentService.addExperiment(newExperiment).subscribe((addedExperiment: Experiment) => {
      this.experiments.push(addedExperiment);
  
      console.log('Experiments after adding:', this.experiments); // Check the experiments array after adding
  
      this.experimentName = '';
      this.experimentDescription = '';
  
      this.isSavingExperiment = false;
    });
  }
  ngOnDestroy(): void {
    // Unsubscribe from the subscription to avoid memory leaks
    this.experimentService.saveToLocalStorage();
  }
}

