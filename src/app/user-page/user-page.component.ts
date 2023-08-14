import { Component } from '@angular/core';
import { Experiment } from '../experiment.model';
import { ExperimentService } from '../experiment.service';
import { UserService } from '../user.service';
import { User } from '../user.model';

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
  originalUsername: string | undefined;
  existingUsername = false;
  fillForm = false;
  passwordMatch = false;
  userAdded = false;
  userEdited = false;
  userDeleted = false;

  constructor(private experimentService: ExperimentService,private userService: UserService) {}

  editUsers(username:string){
       // Find the user based on the username
  this.existingUsername = false;
  const userToEdit = this.users.find(user => user.username === username);

  // If user is found, set the user data and show the edit user form
    if (userToEdit) {
    this.originalUsername = userToEdit.username;
    this.editedUser = { ...userToEdit }; // Make a copy to not modify the original user directly
    this.showEditUserForm = true;
    this.selectedAccountType = this.editedUser!.accountType;
    }
  }
  isExperimentAssigned(experimentName: string): boolean {
    return this.editedUser!.experiments.includes(experimentName);
  }
  saveEditedUser(username:string) {
    // Update the user's experiments with the selected experiments
    this.userAdded = false;
    const usernameExists = this.users.some(user => user.username === this.editedUser!.username && user.username !== this.originalUsername);
   
  if (usernameExists) {
    console.log('Username already exists. Choose a different username.');
    this.existingUsername = true;
    return;
  }
  if (this.selectedExperimentsName.length > 0) {
    this.editedUser!.experiments = this.selectedExperimentsName;
  }
    this.editedUser!.name = this.editedUser!.firstName + ' ' + this.editedUser!.lastName
    // Update the user's information
    this.editedUser!.accountType = this.selectedAccountType;
    this.editedUser!.lastModified = new Date();
  
    // Assuming you have a service method to update the user
    this.userService.updateUser(this.editedUser!);
  
    // Reset the form fields and selectedExperimentIds array
    this.selectedExperimentsName = [];
    this.selectedAccountType = '';
  
    // Hide the edit user form
    this.showEditUserForm = false;
    this.existingUsername = false;
    this.userEdited = true;
  
    console.log('User updated:', this.editedUser);
    this.fetchUsers();
  }
  
  ngOnInit() {
    this.fetchExperiments();
    this.fetchUsers();
    this.userAdded = false;
    this.userEdited = false;
    this.userDeleted = false;
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
    this.userEdited = false;
    this.userAdded = false;
    const updatedUsers = this.userService.deleteUser(username);
    
    // Update the component's users array with the updated user list
    this.users = updatedUsers;
    this.userDeleted = true;
  
    console.log('User deleted:', username);
  }
  addUser() {
    // Check if all required fields are filled
    this.existingUsername = false;
    this.fillForm = false;
    this.passwordMatch = false;
    this.userEdited = false;
    this.userDeleted = false;
    if (!this.username || !this.firstName || !this.lastName || !this.emailAddress || !this.password || !this.rePassword || this.selectedExperimentsName.length === 0) {
      console.log('Please fill in all required fields and select at least one experiment.');
      this.fillForm = true;
      return;
    }
  
    // Check if the passwords match
    if (this.password !== this.rePassword) {
      console.log('Passwords do not match. Please re-enter the same password.');
      this.passwordMatch = true;
      return;
    }
    const usernameTaken = this.users.some(user=> user.username === this.username);
    if (usernameTaken){
      this.existingUsername = true;
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
    this.userAdded = true;
  
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
  this.userEdited= false;
  this.userAdded = false;
  this.userDeleted = false;
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
  let nextId = maxId + 1; // Initialize nextId

  // Read the contents of the selected file using FileReader
  const fileReader = new FileReader();
  fileReader.onload = () => {
    // Process the file contents (result is the content of the file as a string)
    if (typeof fileReader.result === 'string') {
      // Parse CSV data and extract user information
      const usersData: any[] = this.parseCsvData(fileReader.result);
      
      // Convert CSV data to User objects and save them
      const createdUsers: User[] = [];
      for (const userData of usersData) {
        const usernameTaken = this.users.some(user => user.username === userData['username']);

        if (!usernameTaken) {
          const newUser: User = {
            id: nextId++, // Generate a unique ID for the new user
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
          };
          createdUsers.push(newUser);
        }
      }

      // Save the created users using the UserService's saveUsers method
      this.userService.saveUsers(createdUsers);

      // Update the users array with the newly created users
      this.users.push(...createdUsers);

      console.log('Users added from CSV data:', createdUsers);
      console.log('Complete users array:', this.users);

      this.userAdded = true;
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

