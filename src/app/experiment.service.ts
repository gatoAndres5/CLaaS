import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Experiment } from './experiment.model';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  private experiments: Experiment[] = [
    
  ];

  constructor() {}

  getExperiments(): Observable<Experiment[]> {
    // Return the list of experiments as an observable
    return of(this.experiments);
  }

  deleteExperiment(experimentId: number): Observable<void> {
    // Implement the logic to delete an experiment with the given ID
    // For simplicity, we'll just remove the experiment from the array
    this.experiments = this.experiments.filter((experiment) => experiment.id !== experimentId);
    return of(undefined); // Return an observable with undefined value to indicate success
  }
}


