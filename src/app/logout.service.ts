import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private logoutSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  logoutStatus$ = this.logoutSubject.asObservable();

  setLogoutStatus(loggedOut: boolean): void {
    this.logoutSubject.next(loggedOut);
  }
}
