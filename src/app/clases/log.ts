export class Log {
    public usuario: any;
    public tipo: string;
    public fechaDeIngreso: Date;


    constructor(usuario: any, tipo: string, fechaDeIngreso: Date) {
        this.usuario = usuario;
        this.tipo = tipo;
        this.fechaDeIngreso = fechaDeIngreso;
    }

}
