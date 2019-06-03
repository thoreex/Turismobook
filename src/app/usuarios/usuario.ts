import { Centro } from '../centros/centro';
import { Resena } from '../centros/resenas/resena';

export class Usuario {
    id: string;
    email: string;
    imagen?: string;
    nombre?: string;
    rol?: string; // Basico, Editor, Admin
    centros?: Centro[]; // En caso de ser editor
    seguidores?: Centro[];
    resenas?: Resena[];
    fechaCreacion?: Date;
    ultimaModificacion?: Date;
    fechaEliminacion?: Date;
}
