import { Injectable } from '@angular/core';
//import { Http, Response, RequestOptions, Headers } from '@angular/http'; 
//import { Observable }     from 'rxjs/Observable';
import { JsonCreatorService } from './jsoncreator.service';
import { DataService } from './data.service';
import { LocalStorageService } from './localstorage.service';

@Injectable()
export class RegisterService {
	
	constructor(private dataService: DataService, 
                private localstorageService: LocalStorageService,
                private jsonCreator: JsonCreatorService) 
	{ 
	  
	}

	
	public registrarVideoChat(): void { 

		//console.log(this.jsonCreator.getRegistroVideoChat());
	
	    //this.dataService.post("videoChat/registerVideoChat", this.jsonCreator.getRegistroVideoChat());

        //this.dataService.get("Reasoner/GetUserEpisodes?idUser=456&idMode=2");
		//this.dataService.post("videoChat/registerVideoChat", this.jsonCreator.getRegistroVideoChat())
		this.dataService.get("videoChat");
    }

	public verValues(): void { 
	
	    this.dataService.get("values");
    }

	
}