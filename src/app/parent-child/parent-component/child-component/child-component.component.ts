import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.sass']
})
export class ChildComponentComponent implements OnInit {
childMessage2="Hello friend";
@Output() messageEvent = new EventEmitter<string>();
  constructor() { }
  @Input() childMessage: string;
 ngOnInit() {
   // alert(this.childMessage);
 }
  ngOnChanges() {
  //  alert(this.childMessage);
  }
  sendMessage() {
    this.messageEvent.emit(this.childMessage2)
  }
}
