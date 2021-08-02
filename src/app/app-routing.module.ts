import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {ListUserComponent} from "./list-user/list-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {ViewUserComponent} from "./view-user/view-user.component";
import {AddPrescriptionComponent} from "./add-prescription/add-prescription.component";

import {ParentComponentComponent} from "./parent-child/parent-component/parent-component.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'view-user', component: ViewUserComponent },
  { path: 'view-presc', component: AddPrescriptionComponent},
  {path: 'parent-comp', component: ParentComponentComponent},
  {path : '', component : LoginComponent}
];

//export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

  export class AppRoutingModule {

 }
