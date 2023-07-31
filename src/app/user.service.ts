import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'users'; // Key to store users in local storage
  private users: User[] = this.getUsersFromLocalStorage();
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

  deleteUser(username: string): User[] {
    this.users = this.users.filter((user) => user.username !== username);
    this.saveUsersToLocalStorage(this.users);
    return this.users;
  }

  saveUser(user: User): void {
    const users = this.getUsersFromLocalStorage();
    users.push(user);
    this.saveUsersToLocalStorage(users);
  }
  // Function to save an array of users to local storage
  saveUsers(users: User[]): void {
    this.users = users;
    this.saveUsersToLocalStorage(this.users);
  }

}



