import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
	
	url = 'https://presocket.saludnova.com:9001'; 
    socket;
	
    constructor() {
		this.url = localStorage.getItem('socketurl');
    }
	

	
	login(msg) {
		this.socket.emit("login", msg);
    }
	
	disconnect() {
		this.socket.disconnect();
	}
	
	
	getMessages() {
		let observable = new Observable(observer => {
		  this.socket = io(this.url);
		  this.socket.on('notification', (data) => {
			observer.next(data);   
		  });
		})    
		return observable;
   } 	

}