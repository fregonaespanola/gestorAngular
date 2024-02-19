import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CitizenComponent } from './citizen/citizen.component';
import { PromoterComponent } from './promoter/promoter.component';
import { EntityComponent } from './entity/entity.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'citizen', component: CitizenComponent },
  { path: 'promoter', component: PromoterComponent },
  { path: 'entity', component: EntityComponent },
  { path: 'admin', component:  AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}