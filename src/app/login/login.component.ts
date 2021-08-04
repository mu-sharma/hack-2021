import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import * as users from './../../assets/users.json';
import * as roles from './../../assets/acl.json';
//import {AuthenticationService} from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  users: any = (users as any).default;
  roles: any = (roles as any).default;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  onSubmit() {
    this.submitted = true;
    localStorage.removeItem('questionaireRequest');
    localStorage.removeItem('questionaireResponse');
    if (this.loginForm.invalid) {
      return;
    }
    var target=users.users.find(temp=>temp.userid==this.loginForm.controls.email.value)
    if(target && this.loginForm.controls.password.value == 'password') {
      users.users.forEach(element => {
        if(element.userid==this.loginForm.controls.email.value){
          let roleId=element.role;
          roles.roles.forEach(element => {
            if(element.id==roleId){
              if(element.name=='patient'){
               this.router.navigate(['app-patient',target]);
              }
              else{
                this.router.navigate(['app-doctor',target]);
              }
            }
            
          });
        }
      });
      //  this.router.navigate(['list-user']);
    }else {
      this.invalidLogin = true;
    }
  }

  ngOnInit() {
   
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



}
