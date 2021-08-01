import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {User} from "../model/user.model";
import { Observable } from 'rxjs';


@Component({
  selector: 'list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.sass']
})
export class ListUserComponent implements OnInit {

  users: User[];
fakeUsers:any;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  //  setTimeout(() => {
      this.readHardCodeData();
 // }, 2000);


   /*  this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      }); */
 
//return Observable.of(fakeUsers).delay(5000);
  }

  readHardCodeData(){
    this.fakeUsers = [
      {id: 1, firstName: 'Dhiraj', lastName: 'Ray', email: 'dhiraj@gmail.com',phone:8586818344,disease:'chdis'},
      {id: 2, firstName: 'Tom', lastName: 'Jac', email: 'Tom@gmail.com',phone:8586818333,disease:'chdis'},
      {id: 3, firstName: 'Hary', lastName: 'Pan', email: 'hary@gmail.com',phone:8586818322,disease:'chdis'},
      {id: 4, firstName: 'praks', lastName: 'pb', email: 'praks@gmail.com',phone:8586818311,disease:'chdis'},
    
    ];
    
  }
  
  deleteUser(user: User): void {
    this.userService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  viewUser(user: User): void {
    this.router.navigate(['view-user',user]);
    /* this.userService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      }) */
  };

  editUser(user: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user',user]);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };

  
  viewPrescription(): void {
    this.router.navigate(['view-presc']);
  };
}