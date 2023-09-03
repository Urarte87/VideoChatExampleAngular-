import { NgModule, ModuleWithProviders } from '@angular/core';
import { LazyService } from './services/lazy.service';
import { SocketService } from './services/socket.service';
import { SocketServicePatient } from './services/socket.servicePatient';
import { SocketServiceProf } from './services/socket.serviceProf';
import { PeerService } from './services/peer.service';
import { FormsModule } from '@angular/forms';


@NgModule({})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [LazyService, 
	              SocketService, 
				  SocketServicePatient, 
				  SocketServiceProf,
				  PeerService]
    };
  }
}