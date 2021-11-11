import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { HistoriasClinicasService } from 'src/app/servicios/historias-clinicas.service';

@Component({
  selector: 'app-alta-historia-clinica',
  templateUrl: './alta-historia-clinica.component.html',
  styleUrls: ['./alta-historia-clinica.component.scss']
})
export class AltaHistoriaClinicaComponent implements OnInit {
  @Input() paciente: string;

  formAltaHistoria: FormGroup;


  constructor(
    public historiasClinicasService: HistoriasClinicasService,
    public toastr: ToastrService,
    public fb: FormBuilder
  ) {

    this.formAltaHistoria = fb.group({
      paciente: ["", Validators.required],
      altura: ["", Validators.required],
      peso: ["", Validators.required],
      temperatura: ["", Validators.required],
      presion: ["", Validators.required],
      clave1: [""],
      valor1: [""],
      clave2: [""],
      valor2: [""],
      clave3: [""],
      valor3: [""]
    })
  }

  ngOnInit(): void {
    this.formAltaHistoria.controls['paciente'].setValue(this.paciente);

  }

  guardarHistoriaClinica() {
    let especialista: any = JSON.parse(localStorage.getItem('loggedUser'));
    let pacienteMail = this.paciente;
    let altura = this.formAltaHistoria.controls['altura'].value;
    let peso = this.formAltaHistoria.controls['peso'].value;
    let temperatura = this.formAltaHistoria.controls['temperatura'].value;
    let presion = this.formAltaHistoria.controls['presion'].value;
    let clave1 = this.formAltaHistoria.controls['clave1'].value;
    let valor1 = this.formAltaHistoria.controls['valor1'].value;
    let clave2 = this.formAltaHistoria.controls['clave2'].value;
    let valor2 = this.formAltaHistoria.controls['valor2'].value;
    let clave3 = this.formAltaHistoria.controls['clave3'].value;
    let valor3 = this.formAltaHistoria.controls['valor3'].value;
    let fecha: Date = new Date();

    let historiaClinica: HistoriaClinica = new HistoriaClinica(fecha, pacienteMail, especialista.mail, altura, peso, temperatura, presion);
    historiaClinica.clave1 = clave1;
    historiaClinica.valor1 = valor1;
    historiaClinica.clave2 = clave2;
    historiaClinica.valor2 = valor2;
    historiaClinica.clave3 = clave3;
    historiaClinica.valor3 = valor3;

    this.historiasClinicasService.guardarHistoria(historiaClinica).then(resp => {
      this.showSuccess();
    }).catch((error) => {
      this.showError(error);
    });
  }


  showSuccess() {
    this.toastr.success('Se guardó correctamente');
  }

  showError(error: any) {
    this.toastr.error('Algo salió mal. Error: ' + error);
  }
}
