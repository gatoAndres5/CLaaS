import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { UserAgreementComponent } from './user-agreement/user-agreement.component';
import { TaskBarComponent } from './task-bar/task-bar.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ExperimentSlidesComponent } from './experiment-slides/experiment-slides.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ExperimentUsersComponent } from './experiment-users/experiment-users.component';
import { ExperimentDisplayComponent } from './experiment-display/experiment-display.component';
import { ExperimentInstructionsDialogComponent } from './experiment-instructions-dialog/experiment-instructions-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfessorModifyUsersComponent } from './professor-modify-users/professor-modify-users.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserAgreementComponent,
    TaskBarComponent,
    ConfigurationComponent,
    ExperimentSlidesComponent,
    UserPageComponent,
    ExperimentSlidesComponent,
    ExperimentUsersComponent,
    ExperimentDisplayComponent,
    ExperimentInstructionsDialogComponent,
    ChangePasswordComponent,
    ProfessorModifyUsersComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
