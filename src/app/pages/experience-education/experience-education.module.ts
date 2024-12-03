import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExperienceEducationPageRoutingModule } from './experience-education-routing.module';

import { ExperienceEducationPage } from './experience-education.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExperienceEducationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ExperienceEducationPage]
})
export class ExperienceEducationPageModule {}
