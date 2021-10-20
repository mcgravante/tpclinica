import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from 'src/app/registro/registro.component';
import { AuthGuard } from 'src/app/servicios/auth.guard';
import { VerifyEmailComponent } from 'src/app/verify-email/verify-email.component';

const routes: Routes =
  [
    {
      path: '', component: RegistroComponent
    },
    {
      path: 'verify-email', component: VerifyEmailComponent, canActivate: [AuthGuard]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
