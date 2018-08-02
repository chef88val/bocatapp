import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Import your library
import { NgxPermissionsModule } from 'ngx-permissions';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { CookieModule } from 'ngx-cookie';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountdownModule } from 'ngx-countdown';
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
import { AppRoutingModule } from './app-routing.module';
import { ApiRestService } from './services/apiRestService';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AdminItemComponent } from './components/extras/admin-item/admin-item.component';
import { EstadoPedidoPipe } from './estado-pedido.pipe';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';
import { AlertComponent } from './components/extras/alert/alert.component';
import { MultiAlertsComponent } from './components/extras/multi-alerts/multi-alerts.component';
import { MultiAlertsSectionComponent } from './components/extras/multi-alerts-section/multi-alerts-section.component';
import { AlertsService } from './services/alerts.service';
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
    ProfilePipe,
    MainComponent,
    AdminItemComponent,
    EstadoPedidoPipe,
    CapitalizeFirstPipe,
    AlertComponent,
    MultiAlertsComponent,
    MultiAlertsSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    RestangularModule.forRoot(RestangularConfigFactory),
    NgxPermissionsModule.forRoot(),
    TranslateModule.forRoot(),
    CookieModule.forRoot(),
    CountdownModule
  ],
  providers: [ RouterOutlet, ApiRestService, AlertsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
// Function for setting the default restangular configuration
export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://127.0.0.1:3800/api/');
  //RestangularProvider.setDefaultHeaders({ 'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1' });
}

