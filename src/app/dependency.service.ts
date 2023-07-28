// dependency.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VMImage } from './vmimage.model';
import { Experiment } from './experiment.model';
import { Dependency } from './dependency.model';

@Injectable({
  providedIn: 'root'
})
export class DependencyService {
  private dependency: Dependency[] = [];
  private readonly localStorageKey = 'Dependencies'
  constructor() {
    this.loadFromLocalStorage();
  }
  private loadFromLocalStorage() {
    const savedDependency = localStorage.getItem(this.localStorageKey);
    if (savedDependency) {
      this.dependency = JSON.parse(savedDependency);
    }
  }
  private saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.dependency));
  }

  getDependency(): Observable<Dependency[]> {
    return of([...this.dependency]);
  }

  deleteDependency(id: number): Observable<void> {
    this.dependency = this.dependency.filter(image => image.id !== id);
    this.saveToLocalStorage();
    return of(undefined);
  }

  addDependency(newDependency: Dependency): Observable<Dependency> {
    newDependency.id = this.getNextDependencyId();
    this.dependency.push(newDependency);
    this.saveToLocalStorage();
    return of(newDependency);
  }
  private getNextDependencyId(): number {
    const maxId = this.dependency.reduce((max, Dependency) => Math.max(max, Dependency.id), 0);
    return maxId + 1;
  }
  saveDependency(newDependency: any): void {
    // Add the new dependency to the list of dependencies
    this.dependency.push(newDependency);
  }

}


