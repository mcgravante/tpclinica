import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common'

import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS } from 'ng-recaptcha';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { RegistroComponent } from './registro/registro.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './componentes/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { RegistroPacienteComponent } from './componentes/registro-paciente/registro-paciente.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { RegistroEspecialistaComponent } from './componentes/registro-especialista/registro-especialista.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RegistroAdministradorComponent } from './componentes/registro-administrador/registro-administrador.component';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { DetalleUsuarioComponent } from './componentes/detalle-usuario/detalle-usuario.component';
import { TablaUsuariosComponent } from './componentes/tabla-usuarios/tabla-usuarios.component';
import { RespuestaBooleanoPipe } from './pipes/respuesta-booleano.pipe';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { TurnosPacienteComponent } from './componentes/turnos-paciente/turnos-paciente.component';
import { TurnosEspecialistaComponent } from './componentes/turnos-especialista/turnos-especialista.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { TablaTurnosComponent } from './componentes/tabla-turnos/tabla-turnos.component';
import { AltaTurnosComponent } from './componentes/alta-turnos/alta-turnos.component';
import { ListaEspecialidadesComponent } from './componentes/lista-especialidades/lista-especialidades.component';
import { ListaEspecialistasComponent } from './componentes/lista-especialistas/lista-especialistas.component';
import { FiltroEspecialidadesPipe } from './pipes/filtro-especialidades.pipe';
import { FiltroEspecialistasPipe } from './pipes/filtro-especialistas.pipe';
import { DetalleTurnoComponent } from './componentes/detalle-turno/detalle-turno.component';
import { FiltroMixtoEspecialidadEspecialistaPipe } from './pipes/filtro-mixto-especialidad-especialista.pipe';
import { FiltroMixtoEspecialidadPacientePipe } from './pipes/filtro-mixto-especialidad-paciente.pipe';
import { ListaPacientesComponent } from './componentes/lista-pacientes/lista-pacientes.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { HorariosComponent } from './componentes/horarios/horarios.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    VerifyEmailComponent,
    LoginComponent,
    HomeComponent,
    RegistroPacienteComponent,
    NavBarComponent,
    RegistroEspecialistaComponent,
    RegistroAdministradorComponent,
    SeccionUsuariosComponent,
    DetalleUsuarioComponent,
    TablaUsuariosComponent,
    RespuestaBooleanoPipe,
    MisTurnosComponent,
    TurnosPacienteComponent,
    TurnosEspecialistaComponent,
    TurnosComponent,
    TablaTurnosComponent,
    AltaTurnosComponent,
    ListaEspecialidadesComponent,
    ListaEspecialistasComponent,
    FiltroEspecialidadesPipe,
    FiltroEspecialistasPipe,
    DetalleTurnoComponent,
    FiltroMixtoEspecialidadEspecialistaPipe,
    FiltroMixtoEspecialidadPacientePipe,
    ListaPacientesComponent,
    MiPerfilComponent,
    HorariosComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: { siteKey: '6LdVRwsdAAAAAD0LkkzBINpLPA9ThL7-P9-I5NSd' }
  }, AngularFirestoreModule, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
