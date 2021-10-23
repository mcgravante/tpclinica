import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";

@Component({
  selector: 'app-registration',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})

export class RegistroComponent implements OnInit {
  regPaciente: boolean = false;
  regEspecialista: boolean = false;
  regAdministrador: boolean = false;
  esAdmin: boolean = false;
  @Input() isUserPanel: boolean = false;


  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      let user: any = JSON.parse(localStorage.getItem('loggedUser'));
      if (user.tipo == "administrador") {
        this.esAdmin = true;
      }
    }
  }

  registrarPaciente() {
    this.regAdministrador = false;
    this.regPaciente = true;
    this.regEspecialista = false;
  }

  registrarAdministrador() {
    this.regAdministrador = true;
    this.regPaciente = false;
    this.regEspecialista = false;
  }

  registrarEspecialista() {
    this.regAdministrador = false;
    this.regPaciente = false;
    this.regEspecialista = true;
  }
}