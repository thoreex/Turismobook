import { Centro } from '../centro';
import { Usuario } from '../../usuarios/usuario';

export class Resena {
    id?: string;
    centro?: Centro;
    usuario?: Usuario;
    valoracion?: number;
    titulo?: string;
    resena?: string;
    fechaCreacion?: Date;
    ultimaModificacion?: Date;
    fechaEliminacion?: Date;
}
