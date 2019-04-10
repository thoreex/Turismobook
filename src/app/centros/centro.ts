import { Usuario } from '../usuarios/usuario';
import { Resena } from './resena';
import { Horario } from './horario';

export class Centro {
    id: number;
    nombre: string;
    descripcion: string;
    horarios?: Horario[];
    imagen: string;
    fotografias?: string[];
    video?: string;
    seguidores?: Usuario[];
    valoracion?: number;
    cantValoraciones?: number;
    resenas?: Resena[];
    fechaCreacion?: Date;
    ultimaModificacion?: Date;
    fechaEliminacion?: Date;
    editor?: Usuario;
}
