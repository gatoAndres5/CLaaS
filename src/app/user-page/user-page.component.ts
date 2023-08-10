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
  showEditUserForm: boolean = false;
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
  editedUser: User | null = null;
  userExperiments: Experiment[] = [];
  users: User[] = [];
  selectedExperimentName: string[] = [];
  selectedFile: File |undefined ;

  constructor(private experimentService: ExperimentService,private userService: UserService) {}

  editUsers(username:string){
       // Find the user based on the username
  const userToEdit = this.users.find(user => user.username === username);

  // If user is found, set the user data and show the edit user form
  if (userToEdit) {
    this.editedUser = { ...userToEdit }; // Make a copy to not modify the original user directly
    this.showEditUserForm = true;
  }
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
      console.log('Users fetched:',users);
    });
  }

  deleteUser(username: string): void {
    // Delete the user from the service and get the updated user list
    const updatedUsers = this.userService.deleteUser(username);
  
    // Update the component's users array with the updated user list
    this.users = updatedUsers;
  
    console.log('User deleted:', username);
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
    const maxId = this.users.reduce((max, user) => (user.id > max ? user.id : max), 0);

  // Assign new ids for the created users
  let nextId = maxId + 1;
    // Create a new user object
    const newUser: User = {
      id: nextId++, // You can use this logic to generate a unique ID for the new user
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
// Event handler for file input change event
onFileSelected(event: Event): void {
  const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0]; // Get the selected file

    if (file) {
      this.selectedFile = file; // Set the selected file to the component property
      console.log('Selected file:', this.selectedFile.name);
    } else {
      this.selectedFile = undefined; // Reset the selected file property if no file is selected
    }
}

// Function to parse CSV data and extract user data
private parseCsvData(csvData: string): any[] {
  const lines = csvData.split('\n');
  const usersData = [];

  for (let i = 0; i < lines.length; i++) {
    const userValues = lines[i].split(',');

    if (userValues.length >= 5) {
      const user: any = {
        // Map the values directly to the user properties
        username: userValues[0].trim(),
        firstName: userValues[1].trim(),
        lastName: userValues[2].trim(),
        email: userValues[3].trim(),
        password: userValues[4].trim(),
        accountType: userValues[5].trim()
        // You can add more properties as needed based on your CSV format
      };
      usersData.push(user);
    }
  }

  console.log('Parsed user data:', usersData);
  return usersData;
}
// Function to trigger importUsers() with the selected file
onImportUsers(): void {
  if (!this.selectedFile) {
    console.log('No file selected.');
    return;
  }

  // Call importUsers() with the selected file
  this.importUsers(this.selectedFile);
}


// Function to import users from the CSV file
importUsers(file: File): void {
  if (!this.selectedFile) {
    console.log('No file selected.');
    return;
  }
  const maxId = this.users.reduce((max, user) => (user.id > max ? user.id : max), 0);

  // Assign new ids for the created users
  let nextId = maxId + 1;
  // Read the contents of the selected file using FileReader
  const fileReader = new FileReader();
  fileReader.onload = () => {
    // Process the file contents (result is the content of the file as a string)
    if (typeof fileReader.result === 'string') {
      // Parse CSV data and extract user information
      const usersData: any[] = this.parseCsvData(fileReader.result);
      // Convert CSV data to User objects and save them
      const createdUsers: User[] = usersData.map(userData => ({
        id: nextId++, // You can use your logic to generate a unique ID for the new user
        username: userData['username'],
        firstName: userData['firstName'],
        lastName: userData['lastName'],
        name: `${userData['firstName']} ${userData['lastName']}`,
        email: userData['email'],
        password: userData['password'],
        rePassword: userData['password'],
        // Add other properties as needed based on your CSV format
        accountType: this.mapAccountType(userData['accountType']), // Assuming a default value for accountType
        experiments: [], // Initialize the experiments array with an empty array for now
        created: new Date(),
        lastModified: new Date(),
        regStatus: 'Not Registered',
        ipAddress: 'Not Active',
      }));

      // Save the created users using the UserService's saveUsers method
      this.userService.saveUsers(createdUsers);

      // Update the users array with the newly created users
      this.users.push(...createdUsers);

      console.log('Users added from CSV data:', createdUsers);

      console.log('Users added from CSV data:', createdUsers);
      console.log('Complete users array:', this.users);
    } else {
      console.log('Error reading file.');
    }
  };
  fileReader.readAsText(file);
}
// Function to map account type based on the CSV value
private mapAccountType(csvAccountType: string): string {
  switch (csvAccountType) {
    case '1':
      return 'Student';
    case '2':
      return 'Administrator';
    case '3':
      return 'Professor';
    default:
      return 'Unknown';
  }
}
  
}

