import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'users'; // Key to store users in local storage
  private users: User[] = this.getUsersFromLocalStorage();
  private loggedInUser: User | null = null;
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

  // Inside the saveUser method in the UserService
saveUser(user: User): void {
  // Find the index of the user in the users array
  const userIndex = this.users.findIndex((u) => u.id === user.id);

  if (userIndex !== -1) {
    // If the user exists in the users array, update the user object at the found index
    this.users[userIndex] = user;
  } else {
    // If the user is not found in the users array, add the user to the array
    this.users.push(user);
  }
  this.saveUsersToLocalStorage(this.users);
}

  // Function to save an array of users to local storage
  saveUsers(users: User[]): void {
    this.users = users;
    this.saveUsersToLocalStorage(this.users);
  }
  // Function to authenticate a user based on the provided username and password
  authenticateUser(username: string, password: string): User | null {
    // Find the user with the matching username
    const user = this.users.find((user) => user.username === username);

    if (user && user.password === password) {
      // If the user is found and the password matches, return the user
      this.loggedInUser = user;
      return user;
    }

    // If no user is found or the password doesn't match, return null
    return null;
  }
  
  logout(): void{
    this.loggedInUser = null;
  }
  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }
  updateLoggedInUser(user: User): void {
    this.loggedInUser = user;
  }
  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);

    if (index !== -1) {
      // Update the user in the array
      this.users[index] = updatedUser;
      localStorage.setItem('users',JSON.stringify(this.users));

      // You might want to trigger any necessary actions or updates here

      console.log('User updated:', updatedUser);
    } else {
      console.log('User not found:', updatedUser);
    }
  }
  
}



