import { Component, OnInit, OnDestroy, AfterViewInit, AfterContentChecked, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { PatientHistoryComponent } from '../common-components/patient-history/patient-history.component';
import { SharedService } from '../service/shared.service';
//import { timer, of, Observable, Subject } from 'rxjs';
//import { switchMap, takeUntil, catchError } from 'rxjs/operators';
//import { ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from './../service/http.service';
import { interval, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';



//changeDetection: ChangeDetectionStrategy.OnPush


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.sass']
})
export class DoctorComponent implements OnInit,OnDestroy {
  careName:string="UHC Care US";
  showInfo:boolean=false;
patientInfo:any;
observationInfo:any;
div:any;
fname:string;
lname:string;
phone:number;
email:string;
address:any;
dob:any;
diagnosisList:any=[];
diagnosisHistoryList:any=[];
effectiveDate:any;
objDiag:any;
parentObj:any;
allergiesInfo:any=[];
allergies:string="";
medicationInfo:any=[];
medications:string="";
immunizationInfo:any=[];
immunization:string="";
conditionInfo:any;
medical:string="";
familyHistory:string="";
questionaireRequest:any;
questionaireResponse:any;
diagnosisTest:string="";
medicationTest:string="";
symptoms:string="";
addFormPrescription:FormGroup;

constructor(private formBuilder: FormBuilder,private toastr: ToastrService,private modalService: NgbModal,private httpService: HttpService, private sharedService: SharedService) {}

  ngOnInit() {
    this.fetchPatientInfo();
    this.fetchPatientObservations();
    this.fetchAllergiesInfo();
    this.fetchMedicationsInfo();
    this.fetchImmunizationInfo();
    this.fetchConditionInfo();
    this.getKnowGrapghPrediction();
   
    this.addFormPrescription = this.formBuilder.group({
      symptom: [],
      medicine: [],
      ltest: []
     
    });
  
  }
  enableProfile():void{
    this.showInfo=true;
  }


  async fetchPatientInfo() {
    const bundle: any = await this.httpService.getPatientResourceByQueryParam('Patient', '?_id=2438175');
    this.patientInfo = bundle.entry[0].resource;
    this.email= this.patientInfo.telecom[1].value;
    this.fname= this.patientInfo.name[0].given;
    this.lname= this.patientInfo.name[0].family;
    this.phone= this.patientInfo.telecom[0].value;
    this.address=  this.patientInfo.address[0].line +", "+ this.patientInfo.address[0].city  +", "+this.patientInfo.address[0].state  +", "+this.patientInfo.address[0].postalCode;
    this.dob= this.patientInfo.birthDate;
    this.div=this.patientInfo.text.div;
    console.log(this.patientInfo);
    
  }

  

  async fetchAllergiesInfo() {
    const bundle: any = await this.httpService.getPatientResourceByQueryParam('AllergyIntolerance', '?patient=Patient/2438175');
    this.allergiesInfo = bundle.entry[0].resource.code.coding;
   for (let allergy of this.allergiesInfo){
     
      this.allergies=this.allergies +allergy.display + " ,";
   
   
  }
   }

   async fetchMedicationsInfo() {
    const bundle: any = await this.httpService.getPatientResourceByQueryParam('MedicationStatement', '?patient=Patient/2438175');
    this.medicationInfo = bundle.entry[0].resource.contained[0].code.coding;
   for (let medication of this.medicationInfo){
     
      this.medications=this.medications +medication.display + " ,";
   
   
  }
   }

   async fetchImmunizationInfo() {
    const bundle: any = await this.httpService.getPatientResourceByQueryParam('Immunization', '?patient=Patient/2438175');
    this.immunizationInfo = bundle.entry[0].resource.vaccineCode.coding;
   for (let immunization of this.immunizationInfo){
     
      this.immunization=this.immunization +immunization.display + " ,";
   
   
  }
   }

   async fetchConditionInfo() {
    const bundle: any = await this.httpService.getPatientResourceByQueryParam('Condition', '?patient=Patient/2438175');
    let a = bundle.entry[0].resource;
    let b = bundle.entry[1].resource;

   for (let medical of a.code.coding){
      this.medical=this.medical +medical.display + " ,";
  }

  for (let familyHistory of b.code.coding){
    this.familyHistory=this.familyHistory +familyHistory.display + " ,";
}
   }
  
  
  async fetchPatientObservations() {
    const bundle: any = await this.httpService.getObservationResourceByQueryParam('Observation', '?patient=Patient/2438175');
    this.observationInfo= bundle.entry;
   // this.effectiveDate=bundle.entry.effectiveDateTime
    //console.log(  this.observationInfo);
    this.generateMyList( this.observationInfo);
  }
  


  async sendPatientInfo(){
   //this.workerObj.doctorId= this.patientInfo.id;
   let patientId=2438175;
   const bundle: any = await this.httpService.postDataToDoctors(patientId);
  
    /* this.sharedService.setWorkerInfo(this.workerObj);
    
    console.log(this.sharedService.workerService);
    console.log(this.sharedService.workerInfo); */
  //  this.sharedService.fetchData$=this.workerObj.listApi;
  }

generateMyList(entryList:any){
for(let a of entryList){
  let componentList=a.resource.component;
  let effectiveDateTime= a.resource.effectiveDateTime;
  for(let a of componentList){
this.objDiag ={
 diagnosis:a.code.text,
 value:a.valueQuantity.value,
 unit: a.valueQuantity.unit,
 dateOfExam:effectiveDateTime
 }
 this.diagnosisList.push(this.objDiag);

}
this.parentObj={
  key:effectiveDateTime,
  value:this.diagnosisList

}
this.diagnosisList=[];
this.diagnosisHistoryList.push(this.parentObj);
 console.log(this.diagnosisHistoryList);
}



  }

  
  






 
   
Highcharts: typeof Highcharts = Highcharts;
chartOptions: Highcharts.Options = {
  series: [
    {
      type: "pie",
      data: [
        ["Better than you", 20],
        ["Same as you",40],
        ["Worst that you", 40]]
    
    }
  ],
  title: {
    text:' Health Comparision',
    style: {
      color: 'blue',
    }
  },
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: 2,
    plotShadow: true,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 250
}
};




chartOptions1: Highcharts.Options = {
  series: [
    {
      type: "pie",
      data: [1, 2, 3, 4, 5]
    }
  ],
  title: {
    text:' Future Health Prediction',
    style: {
      color: 'blue',
    }
  }
  
};




ngOnDestroy(){
  // For method 2
 // clearInterval(this.intervalId);
}

open(mymodal:any){
 let id= " #mymodal let-modal"
  this.modalService.open(id);
}

getKnowGrapghPrediction(){
  this.questionaireRequest = JSON.parse(localStorage.getItem('questionaireRequest'))
  this.questionaireResponse = JSON.parse(localStorage.getItem('questionaireResponse'))
  for (let dt of this.questionaireResponse.diagnosisTest){
    this.diagnosisTest=this.diagnosisTest +dt + " ,";
    
}
console.log(this.diagnosisTest);
for (let med of this.questionaireResponse.medication){
  this.medicationTest=this.medicationTest +med + " ,";
  
}

/* for (let symp of this.questionaireRequest){
  this.symptoms="Symptoms :" +symp.symptom + " Frequency :"+symp.frequency+ ", ";
  
} */
this.getSymptoms(this.questionaireRequest);
console.log(this.medicationTest);
}

async getSymptoms(request:any){
   const bundle: any = await this.httpService.postDataQuestionaire(request,"/getSymtoms");
   this.symptoms=bundle;
  }
 
  sendPrescriptionInfo(form:FormGroup){
    this.medicationTest=form.controls.medicine.value;
    this.diagnosisTest=form.controls.ltest.value;
    localStorage.setItem("medicine",JSON.stringify(this.medicationTest));
    localStorage.setItem("labTest",JSON.stringify(this.diagnosisTest));
    this.toastr.success('Patient Id: 2438175!', 'Prescription sent Successfully!');
  }
}
