import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { EventEmitter } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';

@Injectable()
export class DataService {
	private navchange = new EventEmitter();
	private headers = new Headers({'Content-Type': 'application/json'});
	private apiUrl = 'http://localhost:49926/api/';  // URL to web api
	//private apiUrl = 'https://prews.saludnova.com:8443/SaludnovaWebApi/api/';
	private options = new RequestOptions({ headers: this.headers });
	private json: any;
	constructor(private http: Http, private localstorageService: LocalStorageService) 
	{
		console.log("Database constructor");
	    this.headers.append('Accept', 'application/json');
		this.headers.append('Content-Type', 'charset=UTF-8');
		this.headers.append('Accept-Language', 'es-ES');
		this.headers.append('CLIENTE',  'SALUDNOVA');
		this.headers.append('PROYECTO', 'TELEMONITORIZACION');
	}
	
	
	getNavChangeEmitter() {
     return this.navchange;
    }
	

	public get(module: String): Promise<any> { 
	
	this.navchange.emit(1);
	
	return this.http.get(this.apiUrl + module, this.options)
	       .toPromise()
		   //.then(response => response.json().data as Any[])
           .then(data => {
             this.navchange.emit(0);
             return data.json();
           })
           .catch(this.handleError);
    }


  	/*public get(module: String) { 
	
		this.navchange.emit(1);

		console.log("llamada");
		
		this.http.get(this.apiUrl + module, this.options).subscribe(result => {
			console.log(result);
			this.json = result.json;
		})

		
    }*/
  
    public post(module: String, jsonobject: Object) { 
	
		this.navchange.emit(1);

		console.log(this.options)

		return this.http.post(this.apiUrl + module, JSON.stringify(jsonobject), this.options)
					.toPromise()
					//.then(response => this.treatResponse(response) as any[])
					.then(data => {
						this.navchange.emit(0);
						return this.treatResponse(data);
					})
					.catch(this.handleError);
	   
    }
	
	
	
	
	private treatResponse(response : any): any[] {

		if (response._body == "") {
		    let anyresponse: any[] = ["OK"];
			return anyresponse;
		}
		return response.json();
	}


	private handleError(error: any): Promise<any> {
		  alert('An error occurred: ' + error);
		  return Promise.reject(error.message || error);
	 }
	
}