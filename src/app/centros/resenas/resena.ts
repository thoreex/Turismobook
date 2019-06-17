import { Centro } from '../centro';
import { Usuario } from '../../usuarios/usuario';
import { Comentario } from './comentario';

export class Resena {
    id?: string;
    centro?: Centro;
    usuario?: Usuario;
    valoracion?: number;
    titulo?: string;
    resena?: string;
    comentarios?: Comentario[];
    fechaCreacion?: Date;
    ultimaModificacion?: Date;
    fechaEliminacion?: Date;
}
