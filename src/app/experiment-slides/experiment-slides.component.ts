import { Component, OnInit } from '@angular/core';
import { Experiment } from '../experiment.model'; // Import the Experiment model if you haven't already
import { ExperimentService } from '../experiment.service';
@Component({
  selector: 'app-experiment-slides',
  templateUrl: './experiment-slides.component.html',
  styleUrls: ['./experiment-slides.component.css']
})
export class ExperimentSlidesComponent {
  selectedExperimentId: number | null = null;
  experiments: Experiment[] = [];

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
}
