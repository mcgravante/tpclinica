export class HistoriaClinica {
    public fecha: Date;
    public paciente: string;
    public altura: number;
    public peso: number;
    public temperatura: number;
    public presion: number;
    public clave1: string;
    public valor1: any;
    public clave2: string;
    public valor2: any;
    public clave3: string;
    public valor3: any;

    constructor(fecha: Date, paciente: string, altura: number, peso: number, temperatura: number, presion: number) {
        this.fecha = fecha;
        this.paciente = paciente;
        this.altura = altura;
        this.peso = peso;
        this.temperatura = temperatura;
        this.presion = presion;
    }


}
