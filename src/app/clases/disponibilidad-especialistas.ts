import { Franja } from "./franja";

export class DisponibilidadEspecialistas {
    public franjas: Franja[];
    public especialista: string;
    public especialidad: string;
    public duracionTurno: number;


    constructor(franjas: Franja[], especialista: string, especialidad: string, duracionTurno: number) {
        this.franjas = franjas;
        this.especialista = especialista;
        this.especialidad = especialidad;
        this.duracionTurno = duracionTurno;

    }

}

