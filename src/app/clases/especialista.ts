import { Especialidad } from "./especialidad";

export class Especialista {

    public nombre: string;
    public apellido: string;
    public edad: number;
    public dni: number;
    public especialidades: Especialidad[];
    public mail: string;
    public password: string;
    public fotoUrl: string;
    public habilitado: boolean;


    constructor(nombre: string, apellido: string, edad: number, dni: number, especialidades: Especialidad[], mail: string, password: string, fotoUrl: string, habilitado: boolean) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.especialidades = especialidades;
        this.mail = mail;
        this.password = password;
        this.fotoUrl = fotoUrl;
        this.habilitado = habilitado;
    }

}

