import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserAgreementComponent } from './user-agreement/user-agreement.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ExperimentSlidesComponent } from './experiment-slides/experiment-slides.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'user-agreement', component: UserAgreementComponent},
  { path: 'configuration', component: ConfigurationComponent},
  {path: 'viewSlides',component:ExperimentSlidesComponent},
  // Other routes for your application
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
