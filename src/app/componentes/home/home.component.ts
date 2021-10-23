import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { AuthenticationService } from 'src/app/shared/authentication-service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

}
