import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DisponibilidadEspecialistas } from '../clases/disponibilidad-especialistas';
import { Especialidad } from '../clases/especialidad';
import { Especialista } from '../clases/especialista';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadEspecialistaService {
  disponibilidades;

  constructor(private firestore: AngularFirestore) {
    this.disponibilidades = firestore.collection("disponibilidades").snapshotChanges();
  }

  getDisponibilidades() {
    return this.firestore.collection("disponibilidades").snapshotChanges();
  }

  getDisponibilidadesByEspecialistaEspecialidad(especialista: string, especialidad: string) {
    return this.firestore.collection("disponibilidades", ref => ref.where('especialista', '==', especialista).where('especialidad', '==', especialidad)).snapshotChanges();
  }

  getDisponibilidad(email: string) {
    return this.firestore.collection("disponibilidades", ref => ref.where('mail', '==', email)).snapshotChanges();
  }

  guardarDisponibilidad(disponibilidad: DisponibilidadEspecialistas) {
    return this.firestore.collection("disponibilidades").add({
      franjas: JSON.parse(JSON.stringify(disponibilidad.franjas)),
      especialista: disponibilidad.especialista,
      especialidad: disponibilidad.especialidad,
      duracionTurno: disponibilidad.duracionTurno
    });
  }
}
