import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SystemJsNgModuleLoader, NgModule, ApplicationRef, Injector, NgModuleFactory, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { CoreModule } from './core.module';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';

import { LocalStorageService } from './services/localstorage.service';
import { JsonCreatorService } from './services/jsoncreator.service';
import { DataService } from './services/data.service';
import { RegisterService } from './services/register.service';

import { AppComponent } from './app.component';
import { WaitingRoomComponent } from './components/waitingroom.component';
import { CallCentreComponent } from './components/callcentre.component';
import { BaseVideoChatComponent } from './components/basevideochat.component';

const routes: Routes = [{ loadChildren: './components/lazy-waitingroom.module' }, 
						{ loadChildren: './components/lazy-callcentre.module' }];
						
												
 export function initConfig(config: AppConfig){
	return () => config.load() 
 }

/*@NgModule({
  imports:      [
      HttpModule,  
      BrowserModule,
      RouterModule.forChild(routes),  
      CoreModule.forRoot()
  ],
   providers: [ DataService,
                RegisterService,
                LocalStorageService,
                JsonCreatorService,
              SystemJsNgModuleLoader,
              AppConfig,
			          { 
                  provide: APP_INITIALIZER,
                  useFactory: initConfig,
                  deps: [AppConfig], 
                  multi: true 
                } 
            ]  
})*/

@NgModule({
  imports:      [
  HttpModule,  
  BrowserModule,
  RouterModule.forChild(routes),  
  CoreModule.forRoot()
  ],
   providers: [SystemJsNgModuleLoader,
               AppConfig,
			  { provide: APP_INITIALIZER,
			   useFactory: initConfig,
			   deps: [AppConfig], 
			   multi: true } ]  
})

export class AppModule { 


  constructor(private injector: Injector, private moduleLoader: SystemJsNgModuleLoader) { }

  ngDoBootstrap(appRef: ApplicationRef) {
    const widgets = document.querySelectorAll('[data-module-path]');
    for (const i in widgets) {
      if (widgets.hasOwnProperty(i)) {
        const modulePath = widgets[i].getAttribute('data-module-path');
        if (modulePath) {
          this.moduleLoader.load(modulePath)
            .then((moduleFactory: NgModuleFactory<any>) => {
              const ngModuleRef = moduleFactory.create(this.injector);
              ngModuleRef.injector.get('components').forEach((components: Type<{}>[]) => {
                components.forEach((component: Type<{}>) => {
                  const compFactory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(component);
                  if (document.querySelector(compFactory.selector)) {
                    appRef.bootstrap(compFactory);
                  }
                });
              });
            });
        }
      }
    }
  }
}
