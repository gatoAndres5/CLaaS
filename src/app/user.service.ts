import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'users'; // Key to store users in local storage

  constructor() {}

  // Function to get the list of users from local storage
  private getUsersFromLocalStorage(): User[] {
    const usersJson = localStorage.getItem(this.localStorageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  // Function to save the list of users to local storage
  private saveUsersToLocalStorage(users: User[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  getUsers(): Observable<User[]> {
    const users = this.getUsersFromLocalStorage();
    return of(users);
  }

  deleteUser(username: string): Observable<void> {
    // Implement the logic to delete a user with the given username
    // For simplicity, we'll just remove the user from the local storage array
    const users = this.getUsersFromLocalStorage();
    const updatedUsers = users.filter((user) => user.username !== username);
    this.saveUsersToLocalStorage(updatedUsers);
    return of(undefined); // Return an observable with undefined value to indicate success
  }

  saveUser(user: User): void {
    const users = this.getUsersFromLocalStorage();
    users.push(user);
    this.saveUsersToLocalStorage(users);
  }
}



