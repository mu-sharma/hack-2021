import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { LoginComponent } from './login/login.component';
import {UserService} from './service/user.service';
import {HttpClientModule} from "@angular/common/http";
import { ParentComponentComponent } from './parent-child/parent-component/parent-component.component';
import { ChildComponentComponent } from './parent-child/parent-component/child-component/child-component.component';
import { LinxModuleModule } from './linx-dashboard-module/linx-module/linx-module.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddPrescriptionComponent } from './add-prescription/add-prescription.component';
@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    LoginComponent,
    ParentComponentComponent,
    ChildComponentComponent,
    ViewUserComponent,
    AddPrescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LinxModuleModule,
    AngularFontAwesomeModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot()
   // RouterModule.forRoot(routes);
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
