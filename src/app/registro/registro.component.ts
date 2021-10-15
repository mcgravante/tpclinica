import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";

@Component({
  selector: 'app-registration',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})

export class RegistroComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit(){}

  signUp(email, password){
      this.authService.RegisterUser(email.value, password.value)      
      .then((res) => {
        // Do something here
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}