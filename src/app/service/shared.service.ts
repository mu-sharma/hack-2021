import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { timer, of, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';


changeDetection: ChangeDetectionStrategy.OnPush

@Injectable({
  providedIn: 'root'
})
export class SharedService {
 // Kill subject to stop all requests for component
  killTrigger: Subject<void> = new Subject();

 // Observable to collect information from an api
 // REPLACE WITH
 // private fetchData$: Observable<string> = this.myservice.checkdata();
  fetchData$: Observable<string> = of("Last information");

  refreshInterval$: Observable<string> = timer(5, 1000)
   .pipe(
     // This kills the request if the user closes the component 
     takeUntil(this.killTrigger),
     // switchMap cancels the last request, if no response have been received since last tick
     switchMap(() => this.fetchData$),
     // catchError handles http throws 
     catchError(error => of('Error'))
   );

 public statustext$: Observable<string> = this.refreshInterval$;
 
 ngOnDestroy(){
   this.killTrigger.next();
 }
  constructor() { }
  public workerService = new BehaviorSubject<any>(false);
  workerInfo = this.workerService.asObservable();
  setWorkerInfo(data: any) {
    this.workerService.next(data);
  };
}