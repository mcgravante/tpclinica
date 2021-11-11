import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HistoriaClinica } from '../clases/historia-clinica';

@Injectable({
  providedIn: 'root'
})
export class HistoriasClinicasService {
  historias: HistoriaClinica[] = [];

  constructor(private firestore: AngularFirestore) {
    firestore.collection("historias").snapshotChanges().subscribe((historias: any) => {
      for (let index = 0; index < historias.length; index++) {
        let historia = historias[index].payload.doc.data();
        this.historias.push(historia);
      }
    });
  }

  getHistorias() {
    return this.firestore.collection("historias").snapshotChanges();
  }
  getHistoriasByPacientes(emailList: string[]) {
    return this.firestore.collection("historias", ref => ref.where("paciente", "in", emailList)).snapshotChanges();
  }
  getHistoriasByPacienteAndEspecialista(pacienteMail: string, especialistaMail: string) {
    return this.firestore.collection("historias", ref => ref.where("paciente", "==", pacienteMail).where("especialista", "==", especialistaMail)).snapshotChanges();
  }
  getHistoria(paciente: string) {
    return this.firestore.collection("historias", ref => ref.where('paciente', '==', paciente)).snapshotChanges();
  }

  guardarHistoria(historia: HistoriaClinica) {
    return this.firestore.collection("historias").add({
      fecha: historia.fecha,
      paciente: historia.paciente,
      especialista: historia.especialista,
      altura: historia.altura,
      peso: historia.peso,
      temperatura: historia.temperatura,
      presion: historia.presion,
      clave1: historia.clave1,
      valor1: historia.valor1,
      clave2: historia.clave2,
      valor2: historia.valor2,
      clave3: historia.clave3,
      valor3: historia.valor3
    });
  }

}
