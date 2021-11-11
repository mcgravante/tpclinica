import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaTurnosComponent } from './componentes/alta-turnos/alta-turnos.component';
import { HomeComponent } from './componentes/home/home.component';
import { InformesComponent } from './componentes/informes/informes.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { LoginComponent } from './login/login.component';
import { RegistroModule } from './modulos/registro/registro.module';
import { AdminAuthGuard } from './servicios/admin-auth.guard';
import { AuthGuard } from './servicios/auth.guard';
import { EspecAuthGuard } from './servicios/espec-auth.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'mis-turnos', component: MisTurnosComponent, canActivate: [AuthGuard]
  },
  {
    path: 'turnos', component: TurnosComponent, canActivate: [AdminAuthGuard]
  },
  {
    path: 'solicitar-turno', component: AltaTurnosComponent, canActivate: [AuthGuard]
  },
  {
    path: 'registro', loadChildren: () => import('./modulos/registro/registro.module').then(m => RegistroModule)
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'mi-perfil', component: MiPerfilComponent
  },
  {
    path: 'pacientes', component: PacientesComponent
  },
  {
    path: 'seccion-usuarios', component: SeccionUsuariosComponent, canActivate: [AdminAuthGuard]
  },
  {
    path: 'pacientes', component: PacientesComponent, canActivate: [EspecAuthGuard]
  },
  {
    path: 'informes', component: InformesComponent, canActivate: [AdminAuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
