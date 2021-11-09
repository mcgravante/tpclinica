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

  getHistoria(paciente: string) {
    return this.firestore.collection("historias", ref => ref.where('paciente', '==', paciente).orderBy('fecha')).snapshotChanges();
  }

  guardarHistoria(historia: HistoriaClinica) {
    return this.firestore.collection("historias").add({
      fecha: historia.fecha,
      paciente: historia.paciente,
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

  cambiarEstadoHistoria(historia: HistoriaClinica) {
    let doc = this.getHistoria(historia.paciente).subscribe((historias: any) => {
      const historiaId = historias[0].payload.doc.id;
      var historiaForUpdate = this.firestore.collection("historias").doc(historiaId);
      historiaForUpdate.update({
        clave1: historia.paciente,
        valor1: historia.paciente,
        clave2: historia.paciente,
        valor2: historia.paciente,
        clave3: historia.paciente,
        valor3: historia.paciente
      })
        .then(() => { })
        .catch((error) => { });
      doc.unsubscribe()
    })
  }

}
