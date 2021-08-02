import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.sass']
})
export class AddPrescriptionComponent implements OnInit {

  constructor() { }
  precriptionList:any;
  ngOnInit() {
    this.readPrecription();
  }

  readPrecription(){
    this.precriptionList = [
      {ICD10: 'I10',diagnosis:'Hypertension', prescription: 'Benazepril, Lisinopril, Chlorothiazide, Metoprolol,Hydralazine', otherTreatment: 'Physical exercise, Stress management, Quitting smoking, Home blood pressure  monitors, Low sodium diet'},
      {ICD10: 'E78.5',diagnosis:'Hyperlipidemia', prescription: 'Lovastatin, Ezetimibe', otherTreatment: 'Aerobic exercise, Weight loss, Low fat diet'},
    ];
  }
}
