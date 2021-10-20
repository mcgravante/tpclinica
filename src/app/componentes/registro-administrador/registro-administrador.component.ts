import { Component, OnInit } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Administrador } from 'src/app/clases/administrador';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { AdministradorService} from 'src/app/servicios/administrador.service';
import { AuthenticationService } from 'src/app/shared/authentication-service';

@Component({
  selector: 'app-registro-administrador',
  templateUrl: './registro-administrador.component.html',
  styleUrls: ['./registro-administrador.component.scss']
})
export class RegistroAdministradorComponent implements OnInit {  formAltaAdministrador: FormGroup;
  basePath = '/fotosPerfil';
  fotoUrl = '';
  task: AngularFireUploadTask;

  constructor(
    public administradorService: AdministradorService,
    public authService: AuthenticationService,
    public router: Router,
    public toastr: ToastrService,
    public fb: FormBuilder,
    public fireStorage: AngularFireStorage,
    public especialidadService: EspecialidadService
  ) {
    this.formAltaAdministrador = fb.group({
      dni: ["", Validators.required],
      nombre: ["", Validators.required],
      mail: ["", Validators.required],
      password: ["", Validators.required],
      apellido: ["", Validators.required],
      edad: ["", Validators.required],
      foto: [null, Validators.required],
    })
  }

  ngOnInit() {
  }

  signUp() {
    let mail = this.formAltaAdministrador.controls['mail'].value;
    let password = this.formAltaAdministrador.controls['password'].value;
    this.authService.RegisterUser(mail, password)
      .then((res) => {
        this.guardarAdministrador();
      }).catch((error) => {
        this.toastr.error("Algo salió mal, intente nuevamente", "Error");
      })
  }

  guardarAdministrador() {
    let nombre = this.formAltaAdministrador.controls['nombre'].value;
    let dni = this.formAltaAdministrador.controls['dni'].value;
    let edad = this.formAltaAdministrador.controls['edad'].value;
    let apellido = this.formAltaAdministrador.controls['apellido'].value;
    let mail = this.formAltaAdministrador.controls['mail'].value;
    let password = this.formAltaAdministrador.controls['password'].value;
    let fotoUrl = this.fotoUrl;
    let administrador = new Administrador(nombre, apellido, edad, dni, mail, password, fotoUrl);
    this.administradorService.guardarAdministrador(administrador).then(resp => {
      this.showSuccess();
    }).catch((error) => {
      this.showError(error);
    });;
  }

  showSuccess() {
    this.toastr.success('Se guardó correctamente');
  }

  showError(error: any) {
    this.toastr.error('Algo salió mal. Error: ' + error);
  }

  async onFileChanged(event) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${file.name}`;  // path at which image will be stored in the firebase storage
      this.task = this.fireStorage.upload(filePath, file);    // upload task
      (await this.task).ref.getDownloadURL().then(url => {
        this.fotoUrl = url;
      });
    } else {
      alert('No images selected');
      this.fotoUrl = '';
    }
  }

}
