import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication-service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { Paciente } from 'src/app/clases/paciente';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.scss']
})
export class RegistroPacienteComponent implements OnInit {

  formAltaPaciente: FormGroup;
  basePath = '/fotosPerfil';
  foto1Url = '';
  foto2Url = '';
  task: AngularFireUploadTask;

  constructor(
    public pacienteService: PacienteService,
    public authService: AuthenticationService,
    public router: Router,
    public toastr: ToastrService,
    public fb: FormBuilder,
    private fireStorage: AngularFireStorage
  ) {
    this.formAltaPaciente = fb.group({
      dni: ["", Validators.required],
      nombre: ["", Validators.required],
      mail: ["", Validators.required],
      password: ["", Validators.required],
      apellido: ["", Validators.required],
      edad: ["", Validators.required],
      obraSocial: ["", Validators.required],
      foto1: [null, Validators.required],
      foto2: [null, Validators.required]
    })
  }

  ngOnInit() { }

  signUp() {
    let mail = this.formAltaPaciente.controls['mail'].value;
    let password = this.formAltaPaciente.controls['password'].value;
    this.authService.RegisterUser(mail, password)
      .then((res) => {
        this.guardarPaciente();
        this.authService.SendVerificationMail();
        this.router.navigate(['registro/verify-email']);
      }).catch((error) => {
        this.toastr.error("Algo salió mal, intente nuevamente", "Error");
      })
  }

  guardarPaciente() {
    let nombre = this.formAltaPaciente.controls['nombre'].value;
    let dni = this.formAltaPaciente.controls['dni'].value;
    let edad = this.formAltaPaciente.controls['edad'].value;
    let apellido = this.formAltaPaciente.controls['apellido'].value;
    let mail = this.formAltaPaciente.controls['mail'].value;
    let password = this.formAltaPaciente.controls['password'].value;
    let obraSocial = this.formAltaPaciente.controls['obraSocial'].value;
    let foto1Url = this.foto1Url;
    let foto2Url = this.foto2Url;
    let paciente = new Paciente(nombre, apellido, edad, dni, obraSocial, mail, password, foto1Url, foto2Url);
    this.pacienteService.guardarPaciente(paciente).then(resp => {
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

  async onFileChanged(event, fotoNumber) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${file.name}`;  // path at which image will be stored in the firebase storage
      this.task = this.fireStorage.upload(filePath, file);    // upload task

      (await this.task).ref.getDownloadURL().then(url => {
        if (fotoNumber == 1) {
          this.foto1Url = url;
        } else {
          this.foto2Url = url;
        }
      });

    } else {
      this.toastr.error('No seleccionó ninguna imagen');
      if (fotoNumber == 1) {
        this.foto1Url = '';
      }
      else {
        this.foto2Url = '';
      }
    }
  }

}
