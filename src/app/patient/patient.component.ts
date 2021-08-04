import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import {PatientProfileComponent} from './../patient-profile/patient-profile.component'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from './../service/http.service';
import { SharedService } from '../service/shared.service';
import {SharedWorker} from './.././model/worker.model'
import { timer, of, Observable, Subject } from 'rxjs';
import * as Highcharts from 'highcharts';
import {Router,ActivatedRoute, ParamMap} from "@angular/router";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import domtoimage from 'dom-to-image';

import { ToastrService } from 'ngx-toastr';



import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass']
})
export class PatientComponent implements OnInit {
isPrescripAvail:boolean=false;
chooseHospital:boolean=false;
chooseCategory:boolean=false;
connectToDoc:boolean=false;
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
dropdownList = [];
selectedItems = [];
dropdownSettings:IDropdownSettings = {};
questionaireForm: FormGroup;
diagnosisTest:any="";
medicationTest:any="";
@ViewChild('htmlData') htmlData:ElementRef;

constructor(private toastr: ToastrService,private formBuilder: FormBuilder,private modalService: NgbModal,private httpService: HttpService, private sharedService: SharedService,private router: Router,private route: ActivatedRoute) {
  const routeParams = this.route.snapshot.paramMap;
  this.careName = routeParams.get('name');
}
 

  ngOnInit() {
    this.questionaireForm = this.formBuilder.group({
      chestDiscomfort: [],
      q1: [],
      breathShortness: [],
      q2: [],
      q11: [],
      q12: [],
      q13: [],
      q21: []
    });
     this.dropdownList = [
      { item_id: 1, item_text: 'UHC Care US' },
      { item_id: 2, item_text: 'UHC Care INDIA' },
      { item_id: 3, item_text: 'UHC Care England' },
      { item_id: 4, item_text: 'UHC Care Netherland' }
  ]; 

 /*  this.selectedItems = [
    { item_id: 1, item_text: 'UHC Care US' }
  ];  */
  
  this.dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };


    this.fetchPatientInfo();
    this.fetchPatientObservations();
    this.fetchAllergiesInfo();
    this.fetchMedicationsInfo();
    this.fetchImmunizationInfo();
    this.fetchConditionInfo();
    this.getPrescription();
  
  }
  enableProfile():void{
    this.showInfo=true;
  }
  onItemSelect(item: any) {
    this.connectToDoc=true;
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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
        name: 'Systolic Blood Pressure',
        y: 107
      }, {
        name: 'Blood Glucose',
        y: 5.9
      }]
    }, {
      name: '2021-02-19',
      type: 'column',
      data: [{
        name: 'Heart Rate',
        y: 48
      }, {
        name: 'Systolic Blood Pressure',
        y: 115
      }, {
        name: 'Blood Glucose',
        y: 3.5
      }]
    }, {
      name: '2020-11-30',
      type: 'column',
      data: [{
        name: 'Heart Rate',
        y: 44
      }, {
        name: 'Systolic Blood Pressure',
        y: 120
      }, {
        name: 'Blood Glucose',
        y: 4.6
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
  /*   if(a.code.text=='Systolic Blood Pressure'){
      let b=a.valueQuantity.value;
      a.valueQuantity.value=b.replace('.','-');
    } */
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

  
  async onSubmit(form:FormGroup){

 var request=   [
      {
      "symptom": form.controls.chestDiscomfort.value,
      "frequency" : form.controls.q1.value
      },
       {
      "symptom": form.controls.breathShortness.value,
      "frequency" :form.controls.q2.value
      }
  ];
  localStorage.removeItem('questionaireRequest');
  localStorage.removeItem('questionaireResponse');
  
  const bundle: any = await this.httpService.postDataQuestionaire(request,"/smartDiagnosis")
  .then((value) =>{
    this.toastr.success('congrats!', 'Data sent Successfully!');
    localStorage.setItem('questionaireRequest', JSON.stringify(request));
    localStorage.setItem('questionaireResponse', value);
    console.log(value);
  } );
 

  
  }
  enableHospital(){
    this.chooseHospital=true;
  }
  enableCategory(){
    this.chooseCategory=true;
  }
  public openPDF() {
    const div = document.getElementById('htmlData');
    const options = { background: 'white', height: 500, width: 700 };
    domtoimage.toPng(div, options).then((dataUrl) => {
        //Initialize JSPDF
        const doc = new jsPDF('p', 'mm', 'a4');
        //Add image Url to PDF
        doc.addImage(dataUrl, 'PNG',10, 10, 180, 150);
        doc.save('prescription_2438175.pdf');
    });
  
    }

    getPrescription(){

      
      this.medicationTest = JSON.parse(localStorage.getItem('medicine'));
      this.diagnosisTest = JSON.parse(localStorage.getItem('labTest'));
      if(this.medicationTest &&   this.diagnosisTest){
        this.isPrescripAvail=true;
      }
     // let req = JSON.parse(localStorage.getItem('questionaireRequest'));
    /*  let x=localStorage.getItem('questionaireResponse');
      let res = JSON.parse(localStorage.getItem('questionaireResponse'));
      if(res){
        this.isPrescripAvail=true;
      }
    
      for (let dt of res.diagnosisTest){
        this.diagnosisTest=this.diagnosisTest +dt + " ,";
        
    }
    
    for (let med of res.medication){
      this.medicationTest=this.medicationTest +med + " ,";
      
    }
     */
    /* for (let symp of this.questionaireRequest){
      this.symptoms="Symptoms :" +symp.symptom + " Frequency :"+symp.frequency+ ", ";
      
    } */
 //   this.getSymptoms(this.questionaireRequest);
    console.log(this.medicationTest);
}

submitFiles(){
  this.toastr.success('4 Files!', 'Uploaded Successfully!');
}
}
