import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PedirComponent } from './components/pedir/pedir.component';
import { ConsultarComponent } from './components/consultar/consultar.component';
import { ReservarComponent } from './components/reservar/reservar.component';
import { NavbarComponent } from './components/extras/navbar/navbar.component';
import { FooterComponent } from './components/extras/footer/footer.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    PedirComponent,
    ConsultarComponent,
    ReservarComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
