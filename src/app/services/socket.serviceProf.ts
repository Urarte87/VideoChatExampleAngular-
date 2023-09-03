import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../services/socket.service';
import * as io from 'socket.io-client';

@Injectable()
export class SocketServiceProf extends SocketService {

	acceptCall(msg) {
		this.socket.emit("acceptcall", msg);
	}
	
	state(msg) {
		this.socket.emit("profState", msg);
	}
}