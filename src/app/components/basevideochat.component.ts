import { Component, Input, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { PeerService } from '../services/peer.service';
import { SocketService } from '../services/socket.service';
import { Mensaje } from '../model/mensaje';

@Component({
  selector: 'app-lazy-videochatcomponent',
  templateUrl: 'videochat.html',
})
export abstract class BaseVideoChatComponent implements OnInit, OnDestroy {
	
  private connection;
  private peer;
  private data;
	private data2;
	protected data3;
  private peerMessages;
	private peerMessages2;
	protected peerMessages3;
  private  msgtext;
	private mensaje;
  private incomingTexts: Mensaje[] = new Array<Mensaje>();
  
  protected request: any = {};
  protected anotherid;
	protected anothername;
  protected mypeerid;
  protected videocalling: boolean = false;
	private date: Date;
  
  @ViewChild('myvideo') myVideo: any;
  @ViewChild('peervideo') peerVideo: any;
  
  
  constructor(protected peerService: PeerService,
			  protected ref: ChangeDetectorRef,
			  protected socketMainService: SocketService) {
  }

  ngOnInit() {
	  this.initPeer();
    this.initMessages();
  }
   
  ngOnDestroy(){
	 this.data.unsubscribe();
	 this.data2.unsubscribe();
	 this.data3.unsubscribe();
  }
  
   abstract treatMessage(msg);
   abstract initRequest();
	 abstract closeVideoChat();
   

    initMessages() {
		this.connection = this.socketMainService.getMessages().subscribe(message => {
			this.treatMessage(message);
		});
    }
   
  
    login() {
	   if (typeof this.request.mac !== typeof undefined) {
			if (this.request.mac != null) this.socketMainService.login(this.request);
	   }
    }
   
  
    initPeer() {

			console.log("initPeer");

		  this.peer = this.peerService.initPeer('lwjd5qra8257b9');
		  
			this.data = this.peerService.getPeerMessages();

			this.peerMessages = this.data.subscribe(message => {

				console.log("subscribe");

				if (message.type == "media") {

					console.log("media");

					this.peerService.videoconnect(this.myVideo.nativeElement,true,true);

					this.data2 = this.peerService.videoAnswer(this.peerVideo.nativeElement, message);

					this.comprobadorVideoChatPatient();
					
				}
				else this.treatChat(message);

				});


			setTimeout(() => {console.log(this.peer.id);
					this.mypeerid = this.peer.id;
					this.initRequest();
					this.login();
			},3000);



   }

	 comprobadorVideoChatPatient(){

		 		this.peerMessages2 = this.data2.subscribe(message => {

					if (message == "close") {

						console.log("subscribe patient close");

						alert("Conexion cerrada por el otro usuario");

						this.closeVideoChat();
						
					}

				});
	 }

	 comprobadorVideoChatCallCenter(){

			this.peerMessages3 = this.data3.subscribe(message => {

				if (message == "close") {

					console.log("subscribe call centre close");

					alert("Conexion cerrada por el otro usuario");

					this.closeVideoChat();
					
				}

			});
	 }
	
	//CHAT
    treatChat(msg) {
		
		 this.mensaje = new Mensaje();
		 this.mensaje.mensaje = msg;
		 this.mensaje.tipo = "2";
		 this.date = new Date();
		 this.mensaje.time = this.date.getHours() +":" + this.date.getMinutes() +":" +this.date.getSeconds();
	   this.incomingTexts.push(this.mensaje);
	   this.ref.detectChanges();
    }
  
  	sendMessage(msg){

		this.mensaje = new Mensaje();
		 this.mensaje.mensaje = msg;
		 this.mensaje.tipo = "1";
		 this.date = new Date();
		 this.mensaje.time = this.date.getHours() +":" + this.date.getMinutes() +":" +this.date.getSeconds();
	   this.incomingTexts.push(this.mensaje);
		var conn = this.peer.connect(this.anotherid);
		 conn.on('open', function(){
		 conn.send(msg);
		});
		this.msgtext = '';
    }

		cleanMessage(){
			this.incomingTexts = [];
		}

		

}