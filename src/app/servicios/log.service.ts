import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Log } from '../clases/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs;

  constructor(private firestore: AngularFirestore) {
    this.logs = firestore.collection("logs").snapshotChanges();
  }

  getLogs() {
    return this.firestore.collection("logs").snapshotChanges();
  }

  getLogByUser(email: string) {
    return this.firestore.collection("logs", ref => ref.where("usuario", "==", email)).snapshotChanges();
  }

  guardarLogIngreso(log: Log) {
    return this.firestore.collection("logs").add({
      usuario: log.usuario,
      tipo: log.tipo,
      fechaDeIngreso: log.fechaDeIngreso
    });
  }
}
