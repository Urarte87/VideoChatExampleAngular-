import { Injectable } from '@angular/core';
@Injectable()
export class LocalStorageService {
	
	constructor() 
	{ 
	}
	
	public addKeyValue(key : string, value : string): void  {
	    var parseCurrent = this.getObject();
		parseCurrent[key] = value;
		localStorage.setItem("currentSaludnova", JSON.stringify(parseCurrent));
		
	}
	
    public removeKey(key : string): void  {
	    var parseCurrent = this.getObject();
		delete parseCurrent[key];
		localStorage.setItem("currentSaludnova", JSON.stringify(parseCurrent));
	}
	
	
	public getKeyValue(key : string): string  {
		var parseCurrent = this.getObject();
		return parseCurrent[key];
	}
	
	private getObject() : Object {
		var currentValue = localStorage.getItem("currentSaludnova");
		return JSON.parse(currentValue);
	}
	
}
