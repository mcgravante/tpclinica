import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Especialidad } from '../clases/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  especialidades;

  constructor(private firestore: AngularFirestore) {
    this.especialidades = firestore.collection("especialidades").snapshotChanges();
  }

  getEspecialidades() {
    return this.firestore.collection("especialidades").snapshotChanges();
  }

  getEspecialidad(key: string) {
    return this.firestore.collection("especialidades").doc(key).valueChanges();
  }

  guardarEspecialidad(especialidad: Especialidad) {
    return this.firestore.collection("especialidades").add({
      nombre: especialidad.nombre
    });
  }
}
