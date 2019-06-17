import { Resena } from './resena';
import { Usuario } from 'src/app/usuarios/usuario';

export class Comentario {
    id?: string;
    resena?: Resena;
    usuario?: Usuario;
    comentario?: string;
    fechaCreacion?: Date;
    ultimaModificacion?: Date;
    fechaEliminacion?: Date;
}
