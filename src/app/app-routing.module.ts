import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CitizenComponent } from './citizen/citizen.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'citizen', component: CitizenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}