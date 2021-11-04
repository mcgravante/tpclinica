import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Administrador } from 'src/app/clases/administrador';
import { RegistroAdministradorComponent } from 'src/app/componentes/registro-administrador/registro-administrador.component';
import { RegistroEspecialistaComponent } from 'src/app/componentes/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from 'src/app/componentes/registro-paciente/registro-paciente.component';
import { RegistroComponent } from 'src/app/registro/registro.component';
import { AdminAuthGuard } from 'src/app/servicios/admin-auth.guard';
import { AuthGuard } from 'src/app/servicios/auth.guard';
import { VerifyEmailComponent } from 'src/app/verify-email/verify-email.component';

const routes: Routes =
  [
    {
      path: '', component: RegistroComponent
    },
    {
      path: 'verify-email', component: VerifyEmailComponent, canActivate: [AuthGuard]
    },
    {
      path: 'administrador', component: RegistroAdministradorComponent, canActivate: [AdminAuthGuard]
    },
    {
      path: 'paciente', component: RegistroPacienteComponent
    },
    {
      path: 'especialista', component: RegistroEspecialistaComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
