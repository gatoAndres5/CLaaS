import { Component } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  currPassword: string = '';  //placeholder for current pasword
  newPassword: string = ''; //placeholder for new password
  confirmPassword: string = ''; //placeholder for confirm password
  isSavingPassword = false; //condition for saving password message
  loggedInUser: User | null = null; //holds the information of the logged in user
  passwordMismatchError = false; //condition for mismatch error message
  passwordIncorrectError = false; //condition for incorrect password message

  constructor(
    private userService: UserService
  ){}

  ngOnInit(): void{ //gathers logged in user with userService
    this.loggedInUser = this.userService.getLoggedInUser();
    console.log("Logged In User:", this.loggedInUser);
    this.passwordMismatchError = false;
    this.isSavingPassword = false;
    this.passwordIncorrectError = false;
  }


  savePassword(): void { //called when user clicks save password button
    this.isSavingPassword = false;
    this.passwordIncorrectError = false;
    this.passwordMismatchError = false;
    if (this.loggedInUser!.password === this.currPassword) { //checks that inputted current password is the same as logged in user password
      // Update the password for the logged-in user
      if(this.newPassword === this.confirmPassword){
      this.loggedInUser!.password = this.newPassword;

      // Reset the form fields
      this.currPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.isSavingPassword = true;
      this.userService.updateLoggedInUser(this.loggedInUser!); //updates user with userService
      }
      else{
        this.passwordMismatchError = true;
      }
    } else {
      // Display an error message or handle password mismatch
      this.passwordIncorrectError = true;
    }
  }
}
