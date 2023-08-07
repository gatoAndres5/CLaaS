import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { ExperimentInstructionsDialogComponent } from '../experiment-instructions-dialog/experiment-instructions-dialog.component';
import { ExperimentService } from '../experiment.service';
import { Experiment } from '../experiment.model';

 // Import the SlidePopupComponent

@Component({
  selector: 'app-experiment-display',
  templateUrl: './experiment-display.component.html',
  styleUrls: ['./experiment-display.component.css']
})
export class ExperimentDisplayComponent {
  experiment: Experiment | null = null;
  showExperimentSlides: boolean = false;
  fileName: File | null = null;
  experiments: Experiment [] = [];
  
  constructor(private route: ActivatedRoute,private dialog: MatDialog,private experimentService: ExperimentService) {}
  ngOnInit(): void {
    this.experimentService.getExperiments().subscribe((experiments) => {
      this.experiments = experiments;
      this.route.queryParams.subscribe((params) => {
        const experimentName = params['name'];
        this.experiment = this.getExperimentByName(experimentName);
        if (this.experiment) {
          this.fileName = this.experiment.slides;
        }
        console.log('Experiment:', this.experiment);
      });
    });
  }
  getExperimentByName(name: string): Experiment | null {
    return this.experiments.find((experiment) => experiment.name === name) || null;
  }
  onToggleExperimentSlides() {
    this.showExperimentSlides = !this.showExperimentSlides;
  
    if (this.showExperimentSlides && this.fileName) {
      // Assuming you have a property `selectedExperiment` containing the current experiment object
      
        // Open the dialog to display the experiment instructions
        const dialogRef = this.dialog.open(ExperimentInstructionsDialogComponent, {
          data: {
            experimentName: this.experiment?.name,
            instructions: this.experiment?.description,
            fileName: this.fileName,
          },
          width: '80%', // Set the width of the dialog as desired
        });
  
        dialogRef.afterClosed().subscribe(() => {
          // Handle any actions after the dialog is closed (if needed)
        });
      
    }
  }
  
  
}
