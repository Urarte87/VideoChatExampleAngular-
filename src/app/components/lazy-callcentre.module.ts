import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallCentreComponent } from './callcentre.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
	FormsModule
  ],
  declarations: [CallCentreComponent],
  providers: [
    { provide: 'components', useValue: [CallCentreComponent], multi: true }
  ],
  entryComponents: [CallCentreComponent]
})
export class LazyCallCentreModule { }