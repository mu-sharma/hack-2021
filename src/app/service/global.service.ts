import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.model";

@Injectable()
export class GlobalService {
  constructor(private http: HttpClient) { }
  

 
}