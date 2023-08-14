import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vpc } from './vpc.model';

@Injectable({
  providedIn: 'root'
})
export class VpcService { //basically every local storage needs to be change to an http request to backend file
  private readonly localStorageKey = 'vpc'
  private vpc : Vpc[] = [];
  constructor() {
    this.loadFromLocalStorage();
   }
   private loadFromLocalStorage() {
    const savedVPC = localStorage.getItem(this.localStorageKey);
    if (savedVPC) {
      this.vpc = JSON.parse(savedVPC);
    }
  }
  private saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.vpc));
  }

  getVPC(): Observable<Vpc[]> {
    return of([...this.vpc]);
  }

  deleteVPC(vpcID: number): Observable<void> {
    this.vpc = this.vpc.filter(image => image.id !== vpcID);
    this.saveToLocalStorage();
    return of(undefined);
  }

  addVPC(newVPC: Vpc): Observable<Vpc> {
    newVPC.id = this.getNextVPCId();
    this.vpc.push(newVPC);
    this.saveToLocalStorage();
    return of(newVPC);
  }
  private getNextVPCId(): number {
    const maxId = this.vpc.reduce((max, VPC) => Math.max(max, VPC.id), 0);
    return maxId + 1;
  }
}
