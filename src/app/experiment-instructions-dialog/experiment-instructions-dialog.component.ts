import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExperimentService } from '../experiment.service';


@Component({
  
    selector: 'app-experiment-instructions-dialog',
    templateUrl: './experiment-instructions-dialog.component.html', // Path to the external HTML file
    styleUrls: ['./experiment-instructions-dialog.component.css']
  
  
})
export class ExperimentInstructionsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private experimentService: ExperimentService
  ) {}

  async ngOnInit() {
    if (this.data.fileName) { //gonna need to find a way to display the slides 
      const embedUrl = await this.experimentService.convertFileToDataUrl(this.data.fileName);
      this.data.embedUrl = embedUrl;
    }
  }
}
