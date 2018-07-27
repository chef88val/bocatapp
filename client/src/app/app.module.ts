import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Import your library
import { NgxPermissionsModule } from 'ngx-permissions';
import { RestangularModule, Restangular } from 'ngx-restangular';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
    BrowserModule,
    NgbModule.forRoot(),
    RestangularModule.forRoot(RestangularConfigFactory),
    NgxPermissionsModule.forRoot(),
    TranslateModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// Function for setting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider) {
  RestangularProvider.setBaseUrl('http://api.restngx.local/v1');
  RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
}
