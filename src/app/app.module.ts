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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
