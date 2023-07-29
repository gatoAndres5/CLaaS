// dependency.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VMImage } from './vmimage.model';
import { Experiment } from './experiment.model';
import { VMImageDependency } from './dependency.model';
import { VPCDependency } from './dependency.model';

@Injectable({
  providedIn: 'root'
})
export class DependencyService {
  private VMImageDependency: VMImageDependency[] = [];
  private VPCDependency: VPCDependency[] = [];
  private readonly VMImagelocalStorageKey = 'VMImageDependencies'
  private readonly VPClocalStorageKey = 'VPCDependencies'
  constructor() {
    this.loadFromLocalStorage();
  }
  private loadFromLocalStorage() {
    const savedVMImageDependency = localStorage.getItem(this.VMImagelocalStorageKey);
    const savedVPCDependency = localStorage.getItem(this.VPClocalStorageKey);
    if (savedVMImageDependency) {
      this.VMImageDependency = JSON.parse(savedVMImageDependency);
    }
    if(savedVPCDependency){
      this.VPCDependency = JSON.parse(savedVPCDependency);
    }
  }
  private saveToLocalStorage() {
    localStorage.setItem(this.VMImagelocalStorageKey, JSON.stringify(this.VMImageDependency));
    localStorage.setItem(this.VPClocalStorageKey, JSON.stringify(this.VPCDependency));
  }

  getVMImageDependency(): Observable<VMImageDependency[]> {
    return of([...this.VMImageDependency]);
  }
  getVPCDependency(): Observable<VPCDependency[]> {
    return of([...this.VPCDependency]);
  }

  deleteVMImageDependency(id: number): Observable<void> {
    this.VMImageDependency = this.VMImageDependency.filter(image => image.id !== id);
    this.saveToLocalStorage();
    return of(undefined);
  }
  deleteVPCDependency(id: number): Observable<void> {
    this.VPCDependency = this.VPCDependency.filter(image => image.id !== id);
    this.saveToLocalStorage();
    return of(undefined);
  }

  addVMImageDependency(newDependency: VMImageDependency): Observable<VMImageDependency> {
    newDependency.id = this.getNextVMImageDependencyId();
    this.VMImageDependency.push(newDependency);
    this.saveToLocalStorage();
    return of(newDependency);
  }
  addVPCDependency(newDependency: VPCDependency): Observable<VPCDependency> {
    newDependency.id = this.getNextVPCDependencyId();
    this.VPCDependency.push(newDependency);
    this.saveToLocalStorage();
    return of(newDependency);
  }
  private getNextVMImageDependencyId(): number {
    const maxId = this.VMImageDependency.reduce((max, VMImageDependency) => Math.max(max, VMImageDependency.id), 0);
    return maxId + 1;
  }
  private getNextVPCDependencyId(): number {
    const maxId = this.VPCDependency.reduce((max, VPCDependency) => Math.max(max, VPCDependency.id), 0);
    return maxId + 1;
  }
  saveVMImageDependency(newDependency: any): void {
    // Add the new dependency to the list of dependencies
    this.VMImageDependency.push(newDependency);
  }
  saveVPCDependency(newDependency: any): void {
    // Add the new dependency to the list of dependencies
    this.VPCDependency.push(newDependency);
  }

}


