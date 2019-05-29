import { Resena } from './resena';

export const RESENAS: Resena[] = [
    {
        id: 0,
        centro: {
            id: '0', nombre: 'c1', descripcion: 'descripcion del centro 1',
            imagen: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/1.jpg'
        },
        usuario: { id: '0', nombre: 'Sebastian Vargas' },
        titulo: 'r1', resena: 'resena 1', valoracion: 2
    },
    {
        id: 1,
        centro: {
            id: '0', nombre: 'c1', descripcion: 'descripcion del centro 1',
            imagen: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/1.jpg'
        },
        usuario: { id: '1', nombre: 'Nervin Quesada' },
        titulo: 'r2', resena: 'resena 2', valoracion: 5
    }
];
