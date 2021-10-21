import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { ToastrService } from 'ngx-toastr';
import { NavBarComponent } from '../componentes/nav-bar/nav-bar.component';
import { PacienteService } from '../servicios/paciente.service';
import { AdministradorService } from '../servicios/administrador.service';
import { EspecialistaService } from '../servicios/especialista.service';
import { Especialista } from '../clases/especialista';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    public administradorService: AdministradorService,
    public pacienteService: PacienteService,
    public especialistaService: EspecialistaService,
    public authService: AuthenticationService,
    public router: Router,
    public toastr: ToastrService
  ) { }

  ngOnInit() { }

  logInAdmin() {
    this.authService.SignIn(this.email, this.password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        let user = this.administradorService.getAdministrador(this.email).subscribe((usuarios: any) => {
          localStorage.setItem('loggedUser', JSON.stringify(usuarios[0].payload.doc.data()));
          NavBarComponent.updateUserStatus.next(true);
          this.toastr.success('Perfecto, bienvenido ' + res.user.email, 'Login');
          this.router.navigate(['home']);
          user.unsubscribe();
        });

      }).catch((error) => {
        this.toastr.error('Algo salió mal, revise los datos ingresados', 'Login');
      })
  }

  logInPaciente() {
    this.authService.SignIn(this.email, this.password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        if (res.user.emailVerified) {
          let user = this.pacienteService.getPaciente(this.email).subscribe((usuarios: any) => {
            localStorage.setItem('loggedUser', JSON.stringify(usuarios[0].payload.doc.data()));
            NavBarComponent.updateUserStatus.next(true);
            this.toastr.success('Perfecto, bienvenido ' + res.user.email, 'Login');
            this.router.navigate(['home']);
            user.unsubscribe();
          });
        } else {
          this.toastr.error('No se ha verificado el email correctamente', 'Login');
          this.router.navigate(['registro/verify-email']);
          return false;
        }
      }).catch((error) => {
        this.toastr.error('Algo salió mal, revise los datos ingresados', 'Login');
      })
  }

  logInEspecialista() {
    this.authService.SignIn(this.email, this.password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        if (res.user.emailVerified) {
          let user = this.especialistaService.getEspecialista(this.email).subscribe((usuarios: any) => {
            let loggedUser = usuarios[0].payload.doc.data();
            if (loggedUser.habilitado == true) {
              localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
              NavBarComponent.updateUserStatus.next(true);
              this.toastr.success('Perfecto, bienvenido ' + res.user.email, 'Login');
            } else {
              localStorage.removeItem('user');
              this.toastr.error('Su cuenta aún no se encuentra habilitada. Por favor, pónganse en contaco con su administrador', 'Login');
            }
            user.unsubscribe();
            this.router.navigate(['home']);
          });
        } else {
          this.toastr.error('No se ha verificado el email correctamente', 'Login');
          this.router.navigate(['registro/verify-email']);
          return false;
        }
      }).catch((error) => {
        this.toastr.error('Algo salió mal, revise los datos ingresados', 'Login');
      })
  }

  cargarAdmin() {
    this.email = "matiasgravante@hotmail.com";
    this.password = "123456";
  }

  cargarPaciente() {
    this.email = "alesilversalmon@hotmail.com";
    this.password = "123456";
  }

  cargarEspecialista() {
    this.email = "matiasgravante@gmail.com";
    this.password = "123456";
  }


}