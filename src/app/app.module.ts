import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntityComponent } from './entity/entity.component';
import { PromoterComponent } from './promoter/promoter.component';
import { AdminComponent } from './admin/admin.component';
import { CitizenComponent } from './citizen/citizen.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PetandreclComponent } from './petandrecl/petandrecl.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

@NgModule({
  declarations: [
    AppComponent,
    EntityComponent,
    PromoterComponent,
    AdminComponent,
    CitizenComponent,
    LoginComponent,
    PetandreclComponent,
    ChatbotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
