import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppConfig {

    private config: Object = null;
    private env: Object = null; 

    constructor(private http: Http) {
    }
	

     public load() {
        return new Promise((resolve, reject) => {
            this.http.get('env.json').map( res => res.json() ).catch((error: any):any => {
                console.log('Configuration file "env.json" could not be read');
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe( (envResponse) => {
                this.env = envResponse;
                let request:any = null;
                switch (this.env['env']) {
                    case 'production': {
                        request = this.http.get('config.' + this.env['env'] + '.json');
                    } break;

                    case 'development': {
                        request = this.http.get('config.' + this.env['env'] + '.json');
                    } break;
                }

                if (request) {
                    request
                        .map( res => res.json() )
                        .catch((error: any) => {
                            console.error('Error reading ' + this.env['env'] + ' configuration file');
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        })
                        .subscribe((responseData) => {
                            this.config = responseData;
							console.log(this.config);
							for (var key in this.config) {
							    localStorage.setItem(key, this.config[key]);
							}
                            resolve(true);
                        });
                } else {
                    console.error('Env config file "env.json" is not valid');
                    resolve(true);
                }
            });

        });
    }
}