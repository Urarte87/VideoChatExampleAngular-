import { Component, Input, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SocketServicePatient } from '../services/socket.servicePatient';
import { PeerService } from '../services/peer.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { BaseVideoChatComponent } from '../components/basevideochat.component';

@Component({
  selector: 'app-lazy-waitingroom',
  templateUrl: 'waitingroom.html',
})
export class WaitingRoomComponent extends BaseVideoChatComponent implements OnInit, OnDestroy {
  private queueNumber: string;
  private isCalling: boolean;
  private timer;
  private sub: Subscription;
	private video: boolean;
	private micro: boolean;
	private patientName: string;
  

  constructor(private socketService: SocketServicePatient,
              peerService: PeerService,
			  ref: ChangeDetectorRef) {
				  
	          super(peerService, ref, socketService); 
			  
	  	      this.isCalling = false;  
  }

    ngOnInit() {
	 super.ngOnInit();
    }
   
    ngOnDestroy(){
        this.sub.unsubscribe();
    }
   
   
    treatMessage(msg) {
		console.log(msg);
	  if (msg.message == "waiting") {
		  this.queueNumber = msg.number;
		  this.isCalling = true;
	  }
	  else if (msg.message == "decreasewaiting") {
		  if (msg.number < parseInt(this.queueNumber)) {
			this.queueNumber = (parseInt(this.queueNumber) - 1).toString();
		  }
	  }
	  else if (msg.message == "videocall") {
		 this.queueNumber = "VIDEOCALLING!!!";
		 this.isCalling = true;
		 this.anotherid = msg.id;
		 this.videocalling = true;
		 this.anothername = msg.callname;
	  }
	  else if (msg.message == "newprof") {
		  if ((parseInt(this.queueNumber) - 1) == 0) {
			 this.call();
		  }
	  }
   }

    initRequest() {
		localStorage.setItem("NombrePac","Paciente: " + this.mypeerid);
	  this.request.id = "0001";
	  this.request.project = "TELEMONITORIZACION";
	  this.request.client = "SALUDNOVA";
	  this.request.version = "1.0";
	  this.request.mac = this.mypeerid;
	  this.request.device = "WEBUSER";
		this.request.callname = localStorage.getItem("NombrePac");
		
    }
	
    checkCall() {
     // if (!this.queueNumber) this.isCalling = false;
	  	this.sub.unsubscribe();
    }

    call() {
		console.log(this.request);
	 	this.isCalling = true;
		this.video= true;
		this.micro= true;
	 	this.timer = Observable.timer(8000,8000);
    this.sub = this.timer.subscribe(t => this.checkCall());
	 	this.socketService.call(this.request);
   
	}

	 closeVideoChat(){
		 //this.stopCall();
		 this.videocalling = false;
		 this.queueNumber = "";
		 this.isCalling = false;
		 this.peerService.desconectar(this.anotherid, this.myVideo);
		 this.cleanMessage();
		 this.anotherid = "";
	 }


	 stopCall() {
		console.log("stopCall");
		this.queueNumber = "";
		this.videocalling = false;
		
		if (this.isCalling) this.socketService.stopcall(this.request);

		this.isCalling = false;
		

			if (this.anotherid){

				//this.stopVideo();
				//this.peerService.desconectar(this.anotherid, this.myVideo);
				//this.cleanMessage();
				//this.ngOnInit();
				//this.anotherid = "";

				this.closeVideoChat();

			}

			
			//super.ngOnInit();

     }

	  stopMicro() {
			if (this.micro == true){
		  	this.micro = false;
		 	 this.peerService.stopPeerAudio(this.anotherid);
				this.myVideo.nativeElement.muted = true;
		  }else{
			this.micro = true;
			this.peerService.startPeerAudio(this.anotherid);
			this.myVideo.nativeElement.muted = false;
		  }
		
     }

	  stopVideo() {

		  if (this.video == true){
		  	this.video = false;
		 	 this.peerService.stopPeerVideo(this.anotherid);
				this.myVideo.nativeElement.pause();
		  }else{
			this.video = true;
			this.peerService.startPeerVideo(this.anotherid);
			this.myVideo.nativeElement.play();
		  }

     }
  
}