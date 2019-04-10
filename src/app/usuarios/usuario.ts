import { Centro } from '../centros/centro';

export class Usuario {
    id: number;
    nombre: string;
    usuario?: string;
    contrasena?: string;
    rol?: string; // Basico, Editor, Admin
    centros?: Centro[];
}
