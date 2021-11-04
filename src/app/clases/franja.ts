import { Time } from "@angular/common";

export class Franja {

    public dia: Dia;
    public start: Time;
    public finish: Time;


    constructor(dia: Dia, start: Time, finish: Time) {
        this.dia = dia;
        this.start = start;
        this.finish = finish;
    }
}

export enum Dia {
    lunes = 1,
    martes = 2,
    miercoles = 3,
    jueves = 4,
    viernes = 5,
    sabado = 6
}