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
    lunes = 2,
    martes = 3,
    miercoles = 4,
    jueves = 5,
    viernes = 6,
    sabado = 7
}