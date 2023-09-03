import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingRoomComponent } from './waitingroom.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [WaitingRoomComponent],
  providers: [
    { provide: 'components', useValue: [WaitingRoomComponent], multi: true }
  ],
  entryComponents: [WaitingRoomComponent]
})
export class LazyWaitingRoomModule { }