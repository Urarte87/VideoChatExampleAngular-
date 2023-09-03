import { Component, Input, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SocketServiceProf } from '../services/socket.serviceProf';
import { PeerService } from '../services/peer.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { BaseVideoChatComponent } from '../components/basevideochat.component';

@Component({
  selector: 'app-lazy-callcentre',
  templateUrl: 'callcentre.html',
})
export class CallCentreComponent extends BaseVideoChatComponent implements OnInit {
	
	private profState: any = {};
	private audio: any = new Audio();
	private incomingCalls: any[] = new Array<any>();
	private conectedUsers: string[] = new Array<string>();
	private video: boolean;
	private micro: boolean;
	private videoconnect;
	private stateMyVideo: boolean;

    constructor(private socketService: SocketServiceProf, 
	            peerService: PeerService,
			    ref: ChangeDetectorRef) {
			    super(peerService, ref, socketService); 
			  
    }
  
	ngOnInit() {
		super.ngOnInit();
		this.audio.src = "https://ws.saludnova.com/app/sound/ring.mp3";
	}
	   
	   
	treatMessage(msg) {
		console.log(msg);
	   if (msg.message == "calling") {
		  if (this.profState.state == "FREE"){
			this.audio.load();
		   this.audio.play();
		  } 
		   this.incomingCalls.push(msg);
	   }
	   else if (msg.message == "callacepted") {
		   console.log("callacepted");
		   	this.stopAudio();
	        this.deleteCall(msg);
	   }
	   else if (msg.message == "cancellcall") {
		   console.log("cancellcall");
		    this.stopAudio();
		    this.deleteCall(msg);
	   }
	   else if (msg.message == "connectedlist") {
		    console.log(msg.userlist);
		    this.conectedUsers = msg.userlist;
	   }
    }
	
	initRequest() {
		localStorage.setItem("NombrePro","Profesional: " + this.mypeerid);
		this.request.id = "0001";
		this.request.project = "TELEMONITORIZACION";
		this.request.client = "SALUDNOVA";
		this.request.version = "1.0";
		this.request.mac = this.mypeerid;
		this.request.device = "WEBPROF";
		this.request.callname = "Nombre profesional";
		this.request.state = "FREE";
		this.profState.state = "FREE";
		this.request.callname = localStorage.getItem("NombrePro");
    }

	

	
	 //INCOMING CALLS  
	  deleteCall(msg) {
		  console.log("deleteCall");
		 this.incomingCalls = this.incomingCalls.filter(function(el) { return el.id != msg.id; }); 
	  }
  
	  clearCalls() {
		 this.incomingCalls = [];
	  }

	  closeVideoChat(){
		console.log("closeVideoChat Callcentre");
		this.request.state = "FREE";
		this.profState.state = "FREE";
		this.socketService.state(this.request);
		this.videocalling = false;
		this.clearCalls();
		this.cleanMessage();
		this.peerService.desconectar(this.anotherid, this.myVideo);
	 }
  
  
	  aceptCall(msg) {
		  this.stopAudio();
		  this.anotherid = msg.id;
		  this.anothername = msg.callname;
		  msg.profid = this.mypeerid;
		  msg.client = this.request.client;
		  msg.project = this.request.project;
		  msg.callname = localStorage.getItem("NombrePro");
		  this.socketService.acceptCall(msg);
		  this.request.state = "BUSY";
		  this.profState.state = "BUSY";
		  this.clearCalls();
		  this.videocalling = true;
		  this.video= true;
		  this.micro= true;
		  this.peerService.videoconnect(this.myVideo.nativeElement, true, true);

		  this.data3 = this.peerService.videoconnectPeer(this.peerVideo.nativeElement,this.anotherid);

		  this.comprobadorVideoChatCallCenter();
	  }
  
  	
  
	  stopAudio() {
		 this.audio.pause();
		 this.audio.currentTime = 0;
	  }

	  stopCall() {

		console.log("stopCall CallCentre" );
		this.peerService.desconectar(this.anotherid, this.myVideo);


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
  
	  connect() {
		  if (this.request.state == "BUSY") {
			  this.request.state = "FREE";
			  this.profState.state = "FREE";
			  this.socketService.state(this.request);
			  //this.initMessages();
		  }
		  else if (this.profState.state == "FREE") {
			  this.request.state = "BUSY";
			  this.profState.state = "BUSY";
			  this.socketService.state(this.request);
			  //this.clearCalls();
			  this.stopAudio();
		  }
	  }
}