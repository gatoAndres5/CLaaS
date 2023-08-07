import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExperimentService } from '../experiment.service';


@Component({
  selector: 'app-experiment-instructions-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.experimentName }}</h2>
    <mat-dialog-content>
      <!-- Add your experiment instructions content here -->
      
      <iframe [src]="data.embedUrl" width="100%" height="500px"></iframe>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
})
export class ExperimentInstructionsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private experimentService: ExperimentService
  ) {}

  async ngOnInit() {
    if (this.data.fileName) {
      const embedUrl = await this.experimentService.convertFileToDataUrl(this.data.fileName);
      this.data.embedUrl = embedUrl;
    }
  }
}
