import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Experiment } from './experiment.model';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  private readonly localStorageKey = 'experiments';
  private experiments: Experiment[] = [];
  private nextExperimentId = 1;

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    const savedExperiments = localStorage.getItem(this.localStorageKey);
    if (savedExperiments) {
      this.experiments = JSON.parse(savedExperiments);
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.experiments));
  }

  getExperiments(): Observable<Experiment[]> {
    return of([...this.experiments]);
  }

  deleteExperiment(experimentId: number): Observable<void> {
    this.experiments = this.experiments.filter(experiment => experiment.id !== experimentId);
    this.saveToLocalStorage();
    return of(undefined);
  }

  addExperiment(newExperiment: Experiment): Observable<Experiment> {
    newExperiment.id = this.getNextExperimentId();
    this.experiments.push(newExperiment);
    this.saveToLocalStorage();
    return of(newExperiment);
  }

  private getNextExperimentId(): number {
    const maxId = this.experiments.reduce((max, experiment) => Math.max(max, experiment.id), 0);
    return maxId + 1;
  }
}




