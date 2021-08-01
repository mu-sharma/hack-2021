import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.sass']
})
export class PatientProfileComponent implements OnInit {

 // profileForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
  }
  profileForm = this.formBuilder.group({
    id: [1],
    email: ['ronaldo@gmail.com', Validators.required],
    firstName: ['Christino', Validators.required],
    lastName: ['Ronaldo', Validators.required],
    phone: ['392309293', Validators.required],
    wt: ['75', Validators.required],
    ht: ['180', Validators.required],
    dob: ['1985-10-03', Validators.required]
  });
}

