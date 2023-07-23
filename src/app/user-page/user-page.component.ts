import { Component } from '@angular/core';
import { Experiment } from '../experiment.model';
import { ExperimentService } from '../experiment.service';
import { UserService } from '../user.service';
import { User } from '../user.model';

// Create an interface for Experiment
interface UserExperiment extends Experiment {
  selected: boolean;
}



@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  showUserForm: boolean = false;
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  emailAddress: string = '';
  password: string = '';
  rePassword: string = '';
  regStatus: string = '';
  name: string = '';
  ipAddress: string = '';
  
  userExperiments: Experiment[] = [];
  users: User[] = [];
  selectedExperimentsIds: number[] = [];

  constructor(private experimentService: ExperimentService,private userService: UserService) {}

  setUsers(userID:string){

  }
  ngOnInit() {
    this.fetchExperiments();
    this.fetchUsers();
  }
  fetchExperiments() {
    this.experimentService.getExperiments().subscribe((experiments: Experiment[]) => {
      // Set selected property to false for each experiment initially
      this.userExperiments = experiments.map((experiment) => ({ ...experiment, selected: false }));
    });
  }
  selectedExperimentIds: number[] = []; // Array to store selected experiment IDs

  toggleUserForm(): void {
    this.showUserForm = !this.showUserForm;
  }
  isSelected(experimentId: number): boolean {
    return this.selectedExperimentIds.includes(experimentId);
  }
  
  toggleExperimentSelection(experimentId: number): void {
    const index = this.selectedExperimentIds.indexOf(experimentId);
    if (index === -1) {
      // If the experiment is not selected, add it to the selectedExperimentIds array
      this.selectedExperimentIds.push(experimentId);
    } else {
      // If the experiment is already selected, remove it from the selectedExperimentIds array
      this.selectedExperimentIds.splice(index, 1);
    }
  }
  fetchUsers() {
    // Call the user service to get the list of users
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  deleteUser(username: string) {
    // Call the user service to delete the user
    this.userService.deleteUser(username).subscribe(() => {
      // Remove the deleted user from the local array
      this.users = this.users.filter((user) => user.id !== user.id);
    });
  }
  addUser() {
    // Check if all required fields are filled
    if (!this.username || !this.firstName || !this.lastName || !this.emailAddress || !this.password || !this.rePassword || this.selectedExperimentIds.length === 0) {
      console.log('Please fill in all required fields and select at least one experiment.');
      return;
    }
  
    // Check if the passwords match
    if (this.password !== this.rePassword) {
      console.log('Passwords do not match. Please re-enter the same password.');
      return;
    }
  
    // Create a new user object
    const newUser: User = {
      id: this.users.length + 1, // You can use this logic to generate a unique ID for the new user
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      name: this.firstName + ' ' + this.lastName,
      email: this.emailAddress,
      password: this.password,
      rePassword: this.rePassword,
      accountType: 'Student', // Assuming you have a default account type for new users
      experiments: this.selectedExperimentIds,
      created: new Date(),
      lastModified: new Date(),
      regStatus: 'Not Registered',
      ipAddress: 'Not Active'
    };
    this.userService.saveUser(newUser);
    // Add the new user to the list of users
    this.users.push(newUser);
  
    // Reset the form fields and selectedExperimentIds array
    this.username = '';
    this.firstName = '';
    this.lastName = '';
    this.emailAddress = '';
    this.password = '';
    this.rePassword = '';
    this.selectedExperimentIds = [];
  
    console.log('New user added:', newUser);
  }
  
}

