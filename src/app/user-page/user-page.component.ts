import { Component } from '@angular/core';
import { Experiment } from '../experiment.model';
import { ExperimentService } from '../experiment.service';
import { UserService } from '../user.service';
import { User } from '../user.model';

// Create an interface for Experiment




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
  selectedAccountType: string = '';
  
  userExperiments: Experiment[] = [];
  users: User[] = [];
  selectedExperimentName: string[] = [];

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
  selectedExperimentsName: string[] = []; // Array to store selected experiment IDs

  toggleUserForm(): void {
    this.showUserForm = !this.showUserForm;
  }
  isSelected(experimentName: string): boolean {
    return this.selectedExperimentsName.includes(experimentName);
  }
  
  toggleExperimentSelection(experimentName: string): void {
    const index = this.selectedExperimentsName.indexOf(experimentName);
    if (index === -1) {
      // If the experiment is not selected, add it to the selectedExperimentIds array
      this.selectedExperimentsName.push(experimentName);
    } else {
      // If the experiment is already selected, remove it from the selectedExperimentIds array
      this.selectedExperimentsName.splice(index, 1);
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
    if (!this.username || !this.firstName || !this.lastName || !this.emailAddress || !this.password || !this.rePassword || this.selectedExperimentsName.length === 0) {
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
      accountType: this.selectedAccountType, // Assuming you have a default account type for new users
      experiments: this.selectedExperimentsName,
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
    this.selectedAccountType = '';
    this.selectedExperimentName = [];
  
    console.log('New user added:', newUser);
  }
  // Event handler for file input change event
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0]; // Get the selected file
  
    if (file) {
      // Read the contents of the selected file using FileReader
      const fileReader = new FileReader();
      fileReader.onload = () => {
        // Process the file contents (result is the content of the file as a string)
        if (typeof fileReader.result === 'string') {
          this.processFile(fileReader.result);
        } else {
          console.log('Error reading file.');
        }
      };
      fileReader.readAsText(file);
    }
  }
  
  // Function to process the selected CSV file
  processFile(csvData: string): void {
    // Parse CSV data to get user data array
    const usersData: any[] = this.parseCsvData(csvData);
  
    // Check if any users were parsed from the CSV data
    if (usersData.length === 0) {
      console.log('No user data found in the CSV file.');
      return;
    }
  
    // Convert the parsed user data to User objects
    const createdUsers: User[] = usersData.map(userData => ({
      id: 0, // You can use your logic to generate a unique ID
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      name: userData.firstName + ' ' + userData.lastName,
      email: userData.email,
      password: userData.password,
      rePassword: userData.password,
      // Add other properties as needed based on your CSV format
      accountType: userData.accountType === '1' ? 'Student' : 'Admin', // Example for accountType mapping
      experiments: [], // Initialize the experiments array with an empty array for now
      created: new Date(),
      lastModified: new Date(),
      regStatus: 'Not Registered',
      ipAddress: 'Not Active'
    }));
  
    // Save the created users to the UserService
    this.userService.saveUsers(createdUsers);
  
    console.log('Users created:', createdUsers);
  }
  
  // Function to parse CSV data and extract user data
  private parseCsvData(csvData: string): any[] {
    const lines = csvData.split('\n');
    const headers = lines[0].split(','); // Assuming the headers are in the first line
    const usersData = [];
  
    for (let i = 1; i < lines.length; i++) {
      const userValues = lines[i].split(',');
  
      if (userValues.length === headers.length) {
        const user: any = {};
        for (let j = 0; j < headers.length; j++) {
          // Use the headers to map the values to the user properties
          user[headers[j]] = userValues[j].trim();
        }
        usersData.push(user);
      }
    }
  
    return usersData;
  }
  
  // Function to create users from CSV data
createUsers(csvData: string): void {
  // Parse the CSV data and extract user information
  const usersData = this.parseCsvData(csvData);

  if (usersData.length === 0) {
    console.log('No user data found in the CSV file.');
    return;
  }

  const createdUsers: User[] = [];

  // Iterate through the extracted user data and create user objects
  usersData.forEach((userData) => {
    const newUser: User = {
      id: this.users.length + 1, // You can use this logic to generate a unique ID for the new user
      username: userData['Username'],
      firstName: userData['First Name'],
      lastName: userData['Last Name'],
      name: `${userData['First Name']} ${userData['Last Name']}`,
      email: userData['Email'],
      password: userData['Password'],
      rePassword: userData['Password'], // Assuming the re-entered password is the same as the password
      accountType: userData['Account Type'], // Assuming the 'Account Type' value is either '1' or '2'
      experiments: [], // You may need to set the experiments array based on your requirements
      created: new Date(),
      lastModified: new Date(),
      regStatus: 'Not Registered',
      ipAddress: 'Not Active',
    };

    // Add the new user to the list of created users
    createdUsers.push(newUser);
  });

  // Call the user service to save the created users
  this.userService.saveUsers(createdUsers);

  // Add the created users to the list of users
  this.users.push(...createdUsers);

  console.log('Users created successfully:', createdUsers);
}

  // Function to import users when the button is clicked
  importUsers(): void {
    // Add any additional logic you need when the "Import Experiment Users" button is clicked
    // You can display a success message or any other user feedback if required
  }
}

