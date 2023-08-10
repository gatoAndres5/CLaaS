import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserAgreementComponent } from './user-agreement/user-agreement.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ExperimentSlidesComponent } from './experiment-slides/experiment-slides.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ExperimentUsersComponent } from './experiment-users/experiment-users.component';
import { ExperimentDisplayComponent } from './experiment-display/experiment-display.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfessorModifyUsersComponent } from './professor-modify-users/professor-modify-users.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'user-agreement', component: UserAgreementComponent},
  { path: 'configuration', component: ConfigurationComponent},
  { path: 'viewSlides',component:ExperimentSlidesComponent},
  { path:'viewUsers',component:UserPageComponent},
  { path: 'viewExperimentUsers',component:ExperimentUsersComponent},
  {path: 'experimentVM', component: ExperimentDisplayComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'professor-modify-users', component: ProfessorModifyUsersComponent}
  // Other routes for your application
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
