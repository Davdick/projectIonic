import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { PostTestComponent } from './post-test/post-test.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    PostTestComponent
  ],
  exports:[
    HeaderComponent,
    PostTestComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
