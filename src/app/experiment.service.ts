import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Experiment } from './experiment.model';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  
  private experiments: Experiment[] = [
    
  ];// Initialize as an empty array
    private nextExperimentId = 1;
  
    constructor() {}
  
    // Rest of the code for getExperiments, deleteExperiment, and addExperiment...
  
  

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
  addExperiment(newExperiment: Experiment): Observable<Experiment> {
    // Generate a unique ID for the new experiment
    newExperiment.id = this.nextExperimentId++;
  
    // Add the new experiment to the array (copying the object)
    this.experiments.push(Object.assign({}, newExperiment));
  
    // Return the added experiment as an observable
    return of(newExperiment);
  }
  saveToLocalStorage(): void {
    localStorage.setItem('experiments', JSON.stringify(this.experiments));
  }

  loadFromLocalStorage(): void {
    const storedExperiments = localStorage.getItem('experiments');
    if (storedExperiments) {
      this.experiments = JSON.parse(storedExperiments);
    }
  }
    
}



