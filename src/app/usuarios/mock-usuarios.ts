import { Usuario } from './usuario';

export const USUARIOS: Usuario[] = [
    {
        id: 0, nombre: 'Sebastian Vargas', usuario: 'Sebas', contrasena: 's123', rol: 'Basico',
        seguidores: [
            {
                id: 0, nombre: 'c1', descripcion: 'descripcion del centro 1',
                imagen: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/1.jpg'
            }
        ],
        resenas: [
            { id: 0, usuario: { id: 0, nombre: 'Sebastian Vargas' }, fechaCreacion: new Date(), resena: 'resena 1', valoracion: 2 }
        ]
    },
    {
        id: 1, nombre: 'Nervin Quesada', usuario: 'Ner', contrasena: 'n123', rol: 'Editor',
        seguidores: [
            {
                id: 0, nombre: 'c1', descripcion: 'descripcion del centro 1',
                imagen: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/1.jpg'
            }
        ],
        resenas: [
            { id: 1, usuario: { id: 1, nombre: 'Nervin Quesada' }, fechaCreacion: new Date(), resena: 'resena 2', valoracion: 5 }
        ]},
    {
        id: 2, nombre: 'Lolito Quesada', usuario: 'Lolito', contrasena: 'l123', rol: 'Admin',
        seguidores: [
            {
                id: 0, nombre: 'c1', descripcion: 'descripcion del centro 1',
                imagen: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/1.jpg'
            },
            {
                id: 1, nombre: 'c2', descripcion: 'descripcion del centro 2',
                imagen: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/2.jpg'
            }
        ]
    }
];
