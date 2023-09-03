import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>`
})
export class AppComponent { 

  

  transmitting: boolean;
  subscription: any;
  
  name = 'Angular'; 

  constructor(private dataService: DataService) { 

	 //this.transmitting = true;
	 this.subscription = this.dataService.getNavChangeEmitter().subscribe(result => this.changeTransmissionState(result));
 }

 changeTransmissionState(result: number) {
	//console.log(result!=0?true:false);
    this.transmitting = result!=0?true:false;
  }
  
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/