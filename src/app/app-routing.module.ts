import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { LoginComponent } from './login/login.component';
import { RegistroModule } from './modulos/registro/registro.module';
import { RegistroComponent } from './registro/registro.component';
import { AdminAuthGuard } from './servicios/admin-auth.guard';
import { AuthGuard } from './servicios/auth.guard';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'mis-turnos', component: MisTurnosComponent
  },
  {
    path: 'turnos', component: TurnosComponent
  },
  {
    path: 'registro', loadChildren: () => import('./modulos/registro/registro.module').then(m => RegistroModule)
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'seccion-usuarios', component: SeccionUsuariosComponent, canActivate: [AdminAuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
