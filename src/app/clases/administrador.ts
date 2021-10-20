export class Administrador {

    public nombre: string;
    public apellido: string;
    public edad: number;
    public dni: number;
    public mail: string;
    public password: string;
    public fotoUrl: string;

    constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, password: string, fotoUrl: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.mail = mail;
        this.password = password;
        this.fotoUrl = fotoUrl;
    }
}
