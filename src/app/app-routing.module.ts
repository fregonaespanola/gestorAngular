import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitizenComponent } from './citizen/citizen.component';
import { PetandreclComponent } from './petandrecl/petandrecl.component';

const routes: Routes = [
  {path: 'citizen', component: CitizenComponent},
  {path: 'petandrecl', component: PetandreclComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
