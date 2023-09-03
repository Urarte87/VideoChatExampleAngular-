import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../services/socket.service';
import * as io from 'socket.io-client';

@Injectable()
export class SocketServicePatient extends SocketService {

	call(msg) {
		console.log(msg);
		this.socket.emit("call", msg);
	}

	stopcall(msg) {
		console.log(msg);
		this.socket.emit("stopcall", msg);
	}
	
}