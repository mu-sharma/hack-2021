import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { LoginComponent } from './login/login.component';
import {UserService} from './service/user.service';
import {SharedService} from './service/shared.service';
import {HttpClientModule} from "@angular/common/http";
import { LinxModuleModule } from './linx-dashboard-module/linx-module/linx-module.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { PatientHistoryComponent } from './common-components/patient-history/patient-history.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from './service/global.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    AppComponent,
    EditUserComponent,
    ListUserComponent,
    LoginComponent,
    PatientComponent,
    DoctorComponent,
    PatientHistoryComponent,
    PatientProfileComponent
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
    ModalModule.forRoot(),
    HighchartsChartModule,
    NgbModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [UserService, GlobalService,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
