import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';
// Load the exporting module.
import * as Exporting from 'highcharts/modules/exporting';



@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.sass']
})
export class PatientHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
 
//  Exporting: typeof Exporting=Exporting;
  Highcharts: typeof Highcharts = Highcharts;

  //temp=Exporting.Highcharts.animate;
  
  
  chartOptions: Highcharts.Options = {
  
    series: [
      {
        type: "line",
        data: [1, 2, 3, 4, 5]
      }
    ],
    title: {
      text:'',
      style: {
        color: 'blue',
      }
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

}
