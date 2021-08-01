import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.sass']
})
export class ViewUserComponent implements OnInit {

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder) { }
id:string;
fName:string;
lName:string;
email:string;
phone:number;
diseaselist:any;
viewForm:FormGroup;
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      this.fName = params.get("firstName");
      this.lName = params.get("lastName");
      this.email= params.get("email");
      this.phone= Number(params.get("phone"));
      this.diseaselist=params.get("data_source");

    });
    this.viewForm = this.formBuilder.group({
      id: [this.id,Validators.required],
      email: [{value:this.email,disabled: true}, Validators.required],
      fName: [{value:this.fName,disabled: true}, Validators.required],
      lName: [{value:this.lName,disabled: true}, Validators.required],
      phone: [{value:this.phone,disabled: true}, Validators.required],
      diseaselist:[{value:this.diseaselist,disabled: true}, Validators.required],
    });
   
   
  }

}
