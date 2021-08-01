import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ListUserComponent} from "./list-user/list-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {ViewUserComponent} from "./view-user/view-user.component";
import {PatientComponent} from "./patient/patient.component";
import {DoctorComponent} from "./doctor/doctor.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'view-user', component: ViewUserComponent },
  {path: 'app-patient', component: PatientComponent},
  {path: 'app-doctor', component: DoctorComponent},
  {path : '', component : LoginComponent}
];

//export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

  export class AppRoutingModule {

 }
