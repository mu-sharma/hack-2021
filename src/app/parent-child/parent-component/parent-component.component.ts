import { Component, OnInit,ViewChild } from '@angular/core';
import {ChildComponentComponent} from './child-component/child-component.component';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrls: ['./parent-component.component.sass']
})
export class ParentComponentComponent implements OnInit {
  parentMessage:string="";
  @ViewChild(ChildComponentComponent) child;
  childMessage2:string;
  constructor() { }

  ngOnInit() {
    this.parentMessage=this.parentMessage +"Mukesh";
   // this.data.currentMessage.subscribe(childMessage2 => this.childMessage2 = childMessage2)
  }
  updateParent():void{
  // alert(this.parentMessage);
  }

  receiveMessage($event) {
    this.childMessage2 = $event
  }
}
