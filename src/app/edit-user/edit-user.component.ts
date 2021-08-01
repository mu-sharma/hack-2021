import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";
import {User} from "../model/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  id:string;
fName:string;
lName:string;
email:string;
phone:number;
disease:any;
  constructor(private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone:['', Validators.required],
      disease:[{value:'chdis'}, Validators.required],
    });
    this.route.paramMap.subscribe(params => {
    /*   this.id = params.get("id");
      this.fName = params.get("firstName");
      this.lName = params.get("lastName");
      this.email= params.get("email");
      this.phone= Number(params.get("phone")); */
      this.disease= 'chdis';
      console.log(params);
      this.editForm.setValue(params['params']);
      console.log(this.editForm);

    });
  
  
    this.userService.getUserById(+userId)
      .subscribe( data => {
       // alert(data);
        this.editForm.setValue(data);
      });
     // console.log(this.editForm);
  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-user']);
        },
        error => {
          alert(error);
        });
  }

}