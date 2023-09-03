import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';
import { Register } from '../model/register';

@Injectable()
export class JsonCreatorService {
	
    private registro;
	
	constructor(private localstorageService: LocalStorageService) 
	{ 
		
	}

	
	public getRegistroVideoChat(): any { 
	
		//this.localstorageService.addKeyValue("currentRegister", JSON.stringify(this.registro));

		/*var registro1 = new Register();

		registro1.idProfesional = "5746";
		registro1.idUsuario = "5277";
	    registro1.Falta = "2017-06-15 00:00:00";
		registro1.Tipo = "INICIO";*/

		/*this.registro["idProfesional"] = "5746";
		this.registro["idUsuario"] = "5277";
	    this.registro["Falta"] = "2017-06-15 00:00:00";
		this.registro["Tipo"] = "INICIO";*/

		/*console.log(registro1);

		this.localstorageService.addKeyValue("currentRegistro", JSON.stringify(registro1));

		console.log(this.localstorageService.getKeyValue("currentRegistro"));

        this.registro = JSON.parse(this.localstorageService.getKeyValue("currentRegistro"));*/

		/*this.registro = new Register();
		this.registro.idProfesional = "5746";
		this.registro.idUsuario = "5277";
	    this.registro.Falta = "2017-06-15 00:00:00";
		this.registro.Tipo = "INICIO";*/

		

//console.log(this.registro);

let registro = {
	"idProfesional":"5746",
	"idUsuario":"5277",
	"Falta":"2017-06-15 00:00:00",
	"Tipo":"INICIO"
}

		return registro;
	}

	
}
