import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VMImage } from './vmimage.model';

@Injectable({
  providedIn: 'root'
})
export class VMImagesService { //basically every local storage needs to be change to an http request to backend file
  private readonly localStorageKey = 'VMImages'
  private vmImages: VMImage[] = [];
  constructor() {
    this.loadFromLocalStorage();
   }
   private loadFromLocalStorage() {
    const savedVMImages = localStorage.getItem(this.localStorageKey);
    if (savedVMImages) {
      this.vmImages = JSON.parse(savedVMImages);
    }
  }
  private saveToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.vmImages));
  }

  getVMImages(): Observable<VMImage[]> {
    return of([...this.vmImages]);
  }

  deleteVMImage(VMImageID: number): Observable<void> {
    this.vmImages = this.vmImages.filter(image => image.id !== VMImageID);
    this.saveToLocalStorage();
    return of(undefined);
  }

  addVMImage(newVMImage: VMImage): Observable<VMImage> {
    newVMImage.id = this.getNextVMImageId();
    this.vmImages.push(newVMImage);
    this.saveToLocalStorage();
    return of(newVMImage);
  }
  private getNextVMImageId(): number {
    const maxId = this.vmImages.reduce((max, VMImage) => Math.max(max, VMImage.id), 0);
    return maxId + 1;
  }
  
}
