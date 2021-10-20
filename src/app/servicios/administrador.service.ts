import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Administrador } from '../clases/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  administradores;

  constructor(private firestore: AngularFirestore) {
    this.administradores = firestore.collection("administradores").snapshotChanges();
  }

  getAdministradores() {
    return this.firestore.collection("administradores").snapshotChanges();
  }

  getAdministrador(email: string) {
    return this.firestore.collection("administradores", ref => ref.where('mail', '==',email)).snapshotChanges();
  }

  guardarAdministrador(administrador: Administrador) {
    return this.firestore.collection("administradores").add({
      nombre: administrador.nombre,
      apellido: administrador.apellido,
      edad: administrador.edad,
      dni: administrador.dni,
      mail: administrador.mail,
      password: administrador.password,
      fotoUrl: administrador.fotoUrl,
      tipo:"administrador"
    });
  }
}
