import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import { unusedValueExportToPlacateAjd } from '@angular/core/src/render3/interfaces/query';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }

  addForm: FormGroup;
  prescFlag:boolean=false;
  pFlag:boolean=false;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [1],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      htens: ['', Validators.required],
      hlipi:['', Validators.required]

    });

  }
  getDiagnosis(form:FormGroup){
    this.pFlag=true;
  }

  onSubmit() {
    this.prescFlag=true;
   // this.userService.createUser(this.addForm.value)
   //   .subscribe( data => {
        //s.router.navigate(['list-user']);
    //  });
  }

}
