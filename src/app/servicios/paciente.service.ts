import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Paciente } from '../clases/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  pacientes;

  constructor(private firestore: AngularFirestore) {
    this.pacientes = firestore.collection("pacientes").snapshotChanges();
  }

  getPacientes() {
    return this.firestore.collection("pacientes").snapshotChanges();
  }

  getPaciente(email: string) {
    return this.firestore.collection("pacientes", ref => ref.where('mail', '==', email)).snapshotChanges();
  }

  guardarPaciente(paciente: Paciente) {
    return this.firestore.collection("pacientes").add({
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      edad: paciente.edad,
      dni: paciente.dni,
      obraSocial: paciente.obraSocial,
      mail: paciente.mail,
      password: paciente.password,
      foto1Url: paciente.foto1Url,
      foto2Url: paciente.foto2Url,
      tipo: "paciente"
    });
  }
}
