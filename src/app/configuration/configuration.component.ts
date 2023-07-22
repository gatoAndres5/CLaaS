import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiment } from '../experiment.model';
import { ExperimentService } from '../experiment.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  experiments: Experiment[] = [];
  experimentName: string = '';
  experimentDescription: string = '';
  isSavingExperiment = false;
  selectedExperimentId: number | undefined;
  login(){

  }
  setUsers(experimentId: number){
  
  }
  username: string = '';
  password: string = '';
  

  @ViewChild('experimentForm') experimentForm!: NgForm;

  constructor(private experimentService: ExperimentService) {}

  ngOnInit() {
    // Fetch the experiments only if the experiments array is empty
    console.log('Experiments array on ngOnInit:', this.experiments);
    console.log('Experiments array length on ngOnInit:', this.experiments.length);
    if (this.experiments.length === 0) {
      this.fetchExperiments();
    }
  }

  fetchExperiments() {
    console.log('Arrived in fetchExperiments');
    this.experimentService.getExperiments().subscribe((experiments: Experiment[]) => {
      this.experiments = experiments;
      console.log('Experiments array after fetching:', this.experiments);
      console.log('Experiments array length after fetching:', this.experiments.length);
    });
  }

  deleteExperiment(experimentId: number) {
    this.experimentService.deleteExperiment(experimentId).subscribe(() => {
      this.experiments = this.experiments.filter(experiment => experiment.id !== experimentId);
    });
  }

  saveExperiment(): void {
    if (this.isSavingExperiment || !this.experimentForm.valid) {
      return;
    }

    const isDuplicate = this.experiments.some(experiment => experiment.name === this.experimentName);

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
      lastModified: new Date()
    };

    this.experimentService.addExperiment(newExperiment).subscribe((addedExperiment: Experiment) => {
      this.experiments.push(addedExperiment);
      this.experimentName = '';
      this.experimentDescription = '';
      this.isSavingExperiment = false;
      console.log('Experiments array after adding:', this.experiments);
    console.log('Experiments array length after adding:', this.experiments.length);
    });
  }
  
}




