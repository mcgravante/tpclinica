export class Paciente {

    public nombre: string;
    public apellido: string;
    public edad: number;
    public dni: number;
    public obraSocial: string;
    public mail: string;
    public password: string;
    public foto1Url: string;
    public foto2Url: string;


    constructor(nombre: string, apellido: string, edad: number, dni: number, obraSocial: string, mail: string, password: string, foto1Url: string, foto2Url: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.obraSocial = obraSocial;
        this.mail = mail;
        this.password = password;
        this.foto1Url = foto1Url;
        this.foto2Url = foto2Url;
    }
}
