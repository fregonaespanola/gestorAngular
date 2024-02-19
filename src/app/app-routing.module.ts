import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitizenComponent } from './citizen/citizen.component';

const routes: Routes = [
  {path: 'citizen', component: CitizenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
