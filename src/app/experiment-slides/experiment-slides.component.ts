import { Component, OnInit } from '@angular/core';
import { Experiment } from '../experiment.model'; // Import the Experiment model if you haven't already
import { ExperimentService } from '../experiment.service';

@Component({
  selector: 'app-experiment-slides',
  templateUrl: './experiment-slides.component.html',
  styleUrls: ['./experiment-slides.component.css']
})
export class ExperimentSlidesComponent {
  selectedExperimentName: string | null = null;
  experiments: Experiment[] = [];
  selectedFile: File | null = null;

  constructor(private experimentService: ExperimentService) {}

  ngOnInit(): void {
    // Fetch the experiments from the service when the component initializes
    this.fetchExperiments();
  }

  fetchExperiments() {
    // Call the experiment service to get the list of experiments
    this.experimentService.getExperiments().subscribe((experiments: Experiment[]) => {
      this.experiments = experiments;
    });
  }
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }
  onUploadFormSubmit(event: Event) {
    event.preventDefault();
  
    if (!this.selectedExperimentName || !this.selectedFile) {
      return;
    }
  
    // Call the method in the ExperimentService to associate the file with the selected experiment
    this.experimentService.uploadFileForExperiment(this.selectedExperimentName, this.selectedFile);
    console.log("Updated experiments array:",this.experiments);
  }
  
  

  onExperimentSelected() {
    console.log("Selected experiment:", this.selectedExperimentName);
  }
}
