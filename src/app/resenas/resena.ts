import { Centro } from '../centros/centro';
import { Usuario } from '../usuarios/usuario';

export class Resena {
    id: number;
    centro?: Centro;
    usuario?: Usuario;
    valoracion: number;
    titulo: string;
    resena: string;
    fechaCreacion?: Date;
    ultimaModificacion?: Date;
    fechaEliminacion?: Date;
}
