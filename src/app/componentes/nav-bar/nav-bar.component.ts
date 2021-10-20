import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { AuthenticationService } from 'src/app/shared/authentication-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLogged: boolean = false;
  esAdmin: boolean = false;
  public static updateUserStatus: Subject<boolean> = new Subject();

  constructor(public router: Router, public authService: AuthenticationService) {
    NavBarComponent.updateUserStatus.subscribe(res => {
      this.isLogged = true;
      let user: any = JSON.parse(localStorage.getItem('loggedUser'));
      if (user.tipo == 'administrador') {
        this.esAdmin = true;
      }
    })
  }

  ngOnInit(): void {
    let user: any = JSON.parse(localStorage.getItem('loggedUser'));

    if (user) {
      this.isLogged = true;
      if (user.tipo == 'administrador') {
        this.esAdmin = true;
      }
    }
    else {
      this.isLogged = false;
    }

  }

  logOut() {
    this.isLogged = false;
    this.esAdmin = false;
    this.authService.SignOut()
  }

}
