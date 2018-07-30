import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/extras/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'new/:email',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule { }
