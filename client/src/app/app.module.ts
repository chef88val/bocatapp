import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Import your library
import { NgxPermissionsModule } from 'ngx-permissions';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { PedirComponent } from './components/pedir/pedir.component';
import { ConsultarComponent } from './components/consultar/consultar.component';
import { ReservarComponent } from './components/reservar/reservar.component';
import { NavbarComponent } from './components/extras/navbar/navbar.component';
import { FooterComponent } from './components/extras/footer/footer.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/extras/login/login.component';
import { FormsModule } from '@angular/forms';
import { PagarComponent } from './components/pagar/pagar.component';
import { SizePipe } from './size.pipe';
import { ProfilePipe } from './profile.pipe';
@NgModule({
  declarations: [
    AppComponent,
    PedirComponent,
    ConsultarComponent,
    ReservarComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    ProfileComponent,
    LoginComponent,
    PagarComponent,
    SizePipe,
    ProfilePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://127.0.0.1:3800/api/');
  //RestangularProvider.setDefaultHeaders({ 'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1' });
}

