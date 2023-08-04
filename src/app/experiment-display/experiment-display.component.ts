import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-experiment-display',
  templateUrl: './experiment-display.component.html',
  styleUrls: ['./experiment-display.component.css']
})
export class ExperimentDisplayComponent {
  experiment: string = "";
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const experimentName = params['name'];
      this.experiment = experimentName;
      // Now you have the experimentName, and you can use it as needed in your component
      console.log('Experiment Name:', experimentName);
    });
  }
  
}
