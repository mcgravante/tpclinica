import { Especialidad } from "./especialidad";
import { Especialista } from "./especialista";
import { Paciente } from "./paciente";

export class Turno {
    public pacienteMail: string;
    public pacienteNombre: string;
    public especialistaMail: string;
    public especialistaNombre: string;
    public fecha: Date;
    public especialidad: string;
    public estado: EstadoTurno;
    public encuesta: string;
    public calificacion: string;
    public resenia: string;


    constructor(pacienteMail: string, pacienteNombre: string, especialistaMail: string, especialistaNombre: string, fecha: Date, especialidad: string, estado: EstadoTurno, encuesta: string, calificacion: string, resenia: string) {
        this.pacienteMail = pacienteMail;
        this.especialistaMail = especialistaMail;
        this.pacienteNombre = pacienteNombre;
        this.especialistaNombre = especialistaNombre;
        this.fecha = fecha;
        this.especialidad = especialidad;
        this.estado = estado;
        this.encuesta = encuesta;
        this.calificacion = calificacion;
        this.resenia = resenia;

    }
}

export enum EstadoTurno {
    cancelado = "Cancelado",
    aceptado = "Aceptado",
    rechazado = "Rechazado",
    finalizado = "Finalizado",
    enespera = "En espera"
}
