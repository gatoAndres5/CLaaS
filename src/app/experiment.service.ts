import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Experiment } from './experiment.model';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService { //basically every local storage needs to be change to an http request to backend file
  private readonly localStorageKey = 'experiments';
  private experiments: Experiment[] = [];
 

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
  uploadFileForExperiment(experimentName: string, file: File): void {
    const formData = new FormData();
    formData.append('experimentName', experimentName);
    formData.append('file', file);
  
    // After successful upload, update the experiment's slides property with the File object
    const experimentToUpdate = this.experiments.find((exp) => exp.name === experimentName);
    if (experimentToUpdate) {
      experimentToUpdate.slides = file;
      this.saveToLocalStorage(); // Save the updated experiment to local storage
      console.log("Success uploading file");
    } else {
      console.log("Error uploading file: Experiment not found");
    }
  }
  convertFileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
  
      fileReader.onload = (event: any) => {
        const dataUrl = event.target.result;
        resolve(dataUrl);
      };
  
      fileReader.onerror = (event) => {
        reject(event.target?.error);
      };
  
      // Add error handling for invalid file
      if (!file || !(file instanceof Blob)) {
        reject(new Error('Invalid file'));
        return;
      }
  
      fileReader.readAsDataURL(file);
    });
  }
  
  
  
  
  
}




