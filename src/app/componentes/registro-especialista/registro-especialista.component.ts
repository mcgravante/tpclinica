import { Component, OnInit } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { EspecialistaService } from 'src/app/servicios/especialista.service';
import { AuthenticationService } from 'src/app/shared/authentication-service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.scss']
})
export class RegistroEspecialistaComponent implements OnInit {
  formAltaEspecialista: FormGroup;
  basePath = '/fotosPerfil';
  fotoUrl = '';
  task: AngularFireUploadTask;
  listaEspecialidades: Especialidad[] = [];
  dropdownSettings: IDropdownSettings = {};
  agrEspecialidad: boolean = false;
  agrEspBtn: string = 'Agregar Especialidad';

  constructor(
    public especialistaService: EspecialistaService,
    public authService: AuthenticationService,
    public router: Router,
    public toastr: ToastrService,
    public fb: FormBuilder,
    public fireStorage: AngularFireStorage,
    public especialidadService: EspecialidadService
  ) {
    this.formAltaEspecialista = fb.group({
      dni: ["", Validators.required],
      nombre: ["", Validators.required],
      mail: ["", Validators.required],
      password: ["", Validators.required],
      apellido: ["", Validators.required],
      edad: ["", Validators.required],
      especialidades: [[], Validators.required],
      foto: [null, Validators.required],
    })
  }

  ngOnInit() {
    this.fillListaEspecialidades()
  }

  signUp() {
    let mail = this.formAltaEspecialista.controls['mail'].value;
    let password = this.formAltaEspecialista.controls['password'].value;
    this.authService.RegisterUser(mail, password)
      .then((res) => {
        this.guardarEspecialista();
        this.authService.SendVerificationMail()
        this.router.navigate(['registro/verify-email']);
      }).catch((error) => {
        this.toastr.error("Algo salió mal, intente nuevamente", "Error");
      })
  }

  guardarEspecialista() {
    let nombre = this.formAltaEspecialista.controls['nombre'].value;
    let dni = this.formAltaEspecialista.controls['dni'].value;
    let edad = this.formAltaEspecialista.controls['edad'].value;
    let apellido = this.formAltaEspecialista.controls['apellido'].value;
    let mail = this.formAltaEspecialista.controls['mail'].value;
    let password = this.formAltaEspecialista.controls['password'].value;
    let especialidades = this.formAltaEspecialista.controls['especialidades'].value;
    let fotoUrl = this.fotoUrl;
    let especialista = new Especialista(nombre, apellido, edad, dni, especialidades, mail, password, fotoUrl, false);
    this.especialistaService.guardarEspecialista(especialista).then(resp => {
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

  activarAgregadoEspecialidad() {
    if (this.agrEspecialidad == false) {
      this.agrEspecialidad = true;
      this.agrEspBtn = 'Cerrar'
    }
    else {
      this.agrEspecialidad = false;
      this.agrEspBtn = 'Agregar Especialidad'
    }
  }

  agregarNuevaEspecialidad(nuevaEspecialidad: string) {
    if (nuevaEspecialidad != '') {
      let especialidad = new Especialidad(nuevaEspecialidad);
      this.especialidadService.guardarEspecialidad(especialidad);
    }
  }

  fillListaEspecialidades() {
    this.especialidadService.especialidades.subscribe((especialidades: any) => {
      let listadoEspecialidadesCombobox: Especialidad[] = [];
      for (let index = 0; index < especialidades.length; index++) {
        const especialidad = especialidades[index];
        listadoEspecialidadesCombobox.push(new Especialidad(especialidad.payload.doc.data().nombre))
      }
      this.listaEspecialidades = listadoEspecialidadesCombobox;
      this.dropdownSettings = {
        idField: 'nombre',
        textField: 'nombre'
      };
    });
  }

}
