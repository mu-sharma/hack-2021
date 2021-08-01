import { Component, OnInit } from '@angular/core';
import {PatientProfileComponent} from './../patient-profile/patient-profile.component'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from './../service/http.service';
import { SharedService } from '../service/shared.service';
import {SharedWorker} from './.././model/worker.model'
import { timer, of, Observable, Subject } from 'rxjs';
import * as Highcharts from 'highcharts';
import {Router,ActivatedRoute, ParamMap} from "@angular/router";
import {IMultiSelectOption,IMultiSelectTexts,IMultiSelectSettings} from 'ngx-bootstrap-multiselect';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass']
})
export class PatientComponent implements OnInit {
  i:number=1;
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
private workerObj:SharedWorker;
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
careName:any;

constructor(private modalService: NgbModal,private httpService: HttpService, private sharedService: SharedService,private router: Router,private route: ActivatedRoute) {
  const routeParams = this.route.snapshot.paramMap;
  this.careName = routeParams.get('name');
}

  ngOnInit() {

    this.myOptions = [
      { id: 1, name: 'UHC Care US' },
      { id: 2, name: 'UHC Care INDIA' },
      { id: 3, name: 'UHC Care England' },
      { id: 4, name: 'UHC Care Netherland' },
  ];
    this.fetchPatientInfo();
    this.fetchPatientObservations();
    this.fetchAllergiesInfo();
    this.fetchMedicationsInfo();
    this.fetchImmunizationInfo();
    this.fetchConditionInfo();
  
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
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
getHealthComparision(dataList:any){
 
  this.chartOptions= {
    series: [
      {
        type: "column",
       // innerSize: '40%',
       name: 'Current(2021-07-27)',
       data: [{
        name: 'Heart Rate',
        y: 47
      }, {
        name: 'Body Temparature',
        y: 34.5
      }, {
        name: 'BMI',
        y: 21.2
      }]
    }, {
      name: '2021-02-19',
      type: 'column',
      data: [{
        name: 'Heart Rate',
        y: 48
      }, {
        name: 'Body Temparature',
        y: 34.5
      }, {
        name: 'BMI',
        y: 20.2
      }]
    }, {
      name: '2020-11-30',
      type: 'column',
      data: [{
        name: 'Heart Rate',
        y: 44
      }, {
        name: 'Body Temparature',
        y: 36.5
      }, {
        name: 'BMI',
        y: 20.2
      }]
      
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
      height: 350
  },
  plotOptions : {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  },
  };
}


  async sendPatientInfo(){
   this.workerObj=new SharedWorker;
   this.workerObj.doctorId= this.patientInfo.id;
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
 this.getHealthComparision(this.diagnosisList);
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

  optionsModel: number[];
  myOptions: IMultiSelectOption[];
// Text configuration
myTexts: IMultiSelectTexts = {
  checkAll: 'Select all',
  uncheckAll: 'Unselect all',
  checked: 'item selected',
  checkedPlural: 'items selected',
  searchPlaceholder: 'Find',
  searchEmptyResult: 'Nothing found...',
  searchNoRenderText: 'Type in search box to see results...',
  defaultTitle: 'Select Hospital',
  allSelected: 'All selected',
};

// Settings configuration
mySettings: IMultiSelectSettings = {
  enableSearch: true,
  checkedStyle: 'fontawesome',
  buttonClasses: 'btn btn-default btn-block',
  dynamicTitleMaxItems: 3,
  displayAllSelectedText: true
};
 
  onChange() {
      console.log(this.optionsModel);
  }
}
