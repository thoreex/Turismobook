import { Centro } from '../centros/centro';
import { Resena } from '../centros/resenas/resena';

export interface Usuario {
    id?: string;
    nombre: string;
    descripcion?: string;
    imagen?: string;
    rol?: string; // Basico, Editor, Admin
    centros?: Centro[]; // En caso de ser editor
    seguidores?: Centro[];
    resenas?: Resena[];
    fechaCreacion?: Date;
    ultimaModificacion?: Date;
    fechaEliminacion?: Date;
}
