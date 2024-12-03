import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExperienceEducationPage } from './experience-education.page';

const routes: Routes = [
  {
    path: '',
    component: ExperienceEducationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExperienceEducationPageRoutingModule {}
