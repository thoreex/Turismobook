import { Usuario } from '../usuarios/usuario';

export class Resena {
    id: number;
    usuario: Usuario;
    valoracion: number;
    resena: string;
    fechaCreacion: Date;
    fechaEliminacion?: Date;
}
