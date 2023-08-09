import { Component } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  currPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  isSavingPassword = false;
  loggedInUser: User | null = null;
  passwordMismatchError = false;
  passwordIncorrectError = false;

  constructor(
    private userService: UserService
  ){}

  ngOnInit(): void{
    this.loggedInUser = this.userService.getLoggedInUser();
    console.log("Logged In User:", this.loggedInUser);
  }


  savePassword(): void {
    if (this.loggedInUser!.password === this.currPassword) {
      this.passwordIncorrectError = false;
      // Update the password for the logged-in user
      if(this.newPassword === this.confirmPassword){
      this.loggedInUser!.password = this.newPassword;

      // Reset the form fields
      this.currPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.isSavingPassword = true;
      this.userService.updateLoggedInUser(this.loggedInUser!);
      }
      else{
        this.passwordMismatchError = true;
      }
    } else {
      // Display an error message or handle password mismatch
      this.passwordMismatchError = false;
      this.passwordIncorrectError = true;
    }
  }
}
