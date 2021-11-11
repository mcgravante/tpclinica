import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Especialidad } from '../clases/especialidad';
import { Especialista } from '../clases/especialista';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {
  especialistas;

  constructor(private firestore: AngularFirestore) {
    this.especialistas = firestore.collection("especialistas").snapshotChanges();
  }

  getEspecialistas() {
    return this.firestore.collection("especialistas").snapshotChanges();
  }

  getEspecialistasByEspecialidad(especialidad: Especialidad) {
    return this.firestore.collection("especialistas", ref => ref.where('especialidades', 'array-contains', especialidad)).snapshotChanges();
  }

  getEspecialistasByList(emailList: string[]) {
    return this.firestore.collection("especialistas", ref => ref.where("mail", "in", emailList)).snapshotChanges();
  }

  getEspecialista(email: string) {
    return this.firestore.collection("especialistas", ref => ref.where('mail', '==', email)).snapshotChanges();
  }

  guardarEspecialista(especialista: Especialista) {
    return this.firestore.collection("especialistas").add({
      nombre: especialista.nombre,
      apellido: especialista.apellido,
      edad: especialista.edad,
      dni: especialista.dni,
      especialidades: especialista.especialidades,
      mail: especialista.mail,
      password: especialista.password,
      fotoUrl: especialista.fotoUrl,
      habilitado: especialista.habilitado,
      tipo: "especialista"
    });
  }

  habilitarEspecialista(email: string, habilitar: boolean) {
    let doc = this.getEspecialista(email).subscribe((especialistas: any) => {
      let especialistaId = especialistas[0].payload.doc.id;
      var especialista = this.firestore.collection("especialistas").doc(especialistaId);
      especialista.update({
        habilitado: habilitar,
      })
        .then(() => { })
        .catch((error) => { });
      doc.unsubscribe()
    })
  }
}
