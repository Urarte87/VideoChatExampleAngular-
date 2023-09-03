import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PeerService {	
	private peer;
	private callActual;
	private n = <any>navigator;
	
	constructor() 
	{

	}
	
	initPeer(myKey) {
	   this.n.getUserMedia =  ( this.n.getUserMedia || this.n.webkitGetUserMedia || this.n.mozGetUserMedia || this.n.oGetUserMedia || this.n.msGetUserMedia );
	   this.peer = new Peer({key: myKey}); 
	   //this.peer = new Peer({host: 'preapotex.saludnova.com', port: 9000, path: '/'});

	   return this.peer;
	}

	
	getPeerMessages() {

		let observable = new Observable(observer => {

			this.peer.on('connection', function(conn) {

				console.log("getPeerMessages() peer on connection");

				conn.on('data', function(data){

					console.log("getPeerMessages() conn on data");

					observer.next(data);   
				});

				conn.on('error', function(data){

					console.log("getPeerMessages() conn on error");

				});

				conn.on('disconnected', function(data){

					console.log("getPeerMessages() conn on disconnected");

				});

				conn.on('close', function(data){

					console.log("getPeerMessages() conn on Close");

				});


			});

			this.peer.on('disconnected', function(){

				console.log("getPeerMessages() peer on disconnected");

			})

			this.peer.on('error', function() {

				console.log("getPeerMessages() peer on error");
			});

		    this.peer.on('call', function(call) {

					console.log("getPeerMessages() peer on call");
					observer.next(call);
      		});

			this.peer.on('close', function() {
					console.log("close");
      		});

			this.peer.oniceconnectionstatechange = function() {

				
				console.log("getPeerMessages() peer on oniceconnectionstatechange");
				
			
				if(this.peer.iceConnectionState == 'disconnected') {
						console.log('Disconnected');
				}
			}

		})  		
		return observable;
	}

	videoAnswer(peerVideo, call){

		let observable = new Observable(observer => {

		let video = peerVideo;

	    this.n.getUserMedia({video: true, audio: true}, function(stream) {
				
				call.answer(stream);

				call.on('stream', function(remotestream){
					console.log("videoAnswer call on close");
				  video.src = URL.createObjectURL(remotestream);
				  video.play();
				  observer.next('stream');
				});

				call.on('close', function(){
				  console.log("videoAnswer call on close");
				  observer.next('close');
				});

			  }, function(err) {
	    		alert('Failed to get stream getmessages');
		   })

		 })

		return observable;
	}
	
	
	videoconnect(myVideo, v, a){

		let video = myVideo;

		this.n.getUserMedia({video: v, audio: a}, function(stream) {
		   
		   video.src = URL.createObjectURL(stream);

		   video.play();

		}, function(err){
		  console.log('Failed to get stream', err);
		});


	}

	 videoconnectPeer(peerVideo, anotherid){
		let video = peerVideo;
		var localvar = this.peer;
		var fname = anotherid;

		console.log("videoconnectPeer");

		let observable = new Observable(observer => {
		
			this.n.getUserMedia({video: true, audio: true}, function(stream) {

					var call = localvar.call(fname, stream);

					call.on('stream', function(remotestream) {

						video.src = URL.createObjectURL(remotestream);

						video.play();

					});

					call.on('error', function(error) {

						console.log("videoconnectPeer call on error");

						observer.next('error');

					});

					call.on('close', function(error) {

						console.log("videoconnectPeer call on close");

						observer.next('close');

					});


				}
				, function(err){
				alert('Failed to get stream videoconnectpeer');
			})

			
		
		})

		return observable;

	 }

	 stopPeerVideo(anotherid){

		this.peer.connections[anotherid].forEach(element => {
			element.localStream.getVideoTracks()[0].enabled = false;
		});
		//this.peer.connections[anotherid][0].localStream.getVideoTracks()[0].enabled = false;

	 }

	 startPeerVideo(anotherid){

		 this.peer.connections[anotherid].forEach(element => {
			element.localStream.getVideoTracks()[0].enabled = true;
		});

		//this.peer.connections[anotherid][0].localStream.getVideoTracks()[0].enabled = true;

	 }

	stopPeerAudio(anotherid){	

		this.peer.connections[anotherid].forEach(element => {
			element.localStream.getAudioTracks()[0].enabled = false;
		});

		//this.peer.connections[anotherid][0].localStream.getAudioTracks()[0].enabled = false;

	 }

	 startPeerAudio(anotherid){

		 this.peer.connections[anotherid].forEach(element => {
			element.localStream.getAudioTracks()[0].enabled = true;
		});

		//this.peer.connections[anotherid][0].localStream.getAudioTracks()[0].enabled = true;

	 }


	 desconectar(anotherid, myid){

		console.log("desconectar");

		console.log(this.peer.connections[anotherid]);

		this.peer.connections[anotherid].forEach(element => {
			element.close();
		});

		//this.peer.connections[anotherid][0].close();

	 }


}