import { Centro } from './centro';

export const CENTROS: Centro[] = [
    {
        id: 0, nombre: 'c1', descripcion: 'descripcion del centro 1',
        horarios: [
            { id: 0, inicio: new Date(), fin: new Date() },
            { id: 1, inicio: new Date(), fin: new Date() },
            { id: 2, inicio: new Date(), fin: new Date() },
        ],
        imagen: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/1.jpg',
        fotografias: [
            'https://valor-software.com/ngx-bootstrap/assets/images/nature/2.jpg',
            'https://valor-software.com/ngx-bootstrap/assets/images/nature/3.jpg',
            'https://valor-software.com/ngx-bootstrap/assets/images/nature/4.jpg'
        ],
        video: 'zpOULjyy-n8',
        seguidores: [
            { id: '0', email: '', nombre: 'Sebastian Vargas' },
            { id: '1', email: '', nombre: 'Nervin Quesada' },
            { id: '2', email: '', nombre: 'Lolito Quesada' }
        ],
        valoracion: 3.5,
        cantValoraciones: 2,
        resenas: [
            {
                id: 0, usuario: { id: '0', email: '', nombre: 'Sebastian Vargas' },
                titulo: 'r1', resena: 'resena 1', valoracion: 2
            },
            {
                id: 1, usuario: { id: '1', email: '', nombre: 'Nervin Quesada' },
                titulo: 'r2', resena: 'resena 2', valoracion: 5
            }
        ],
        fechaCreacion: new Date(), ultimaModificacion: new Date()
    },
    {
        id: 1, nombre: 'c2', descripcion: 'descripcion del centro 2',
        imagen: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/2.jpg',
        video: '8ecJE3cy06Q',
        fechaCreacion: new Date(), ultimaModificacion: new Date()
    },
    {
        id: 2, nombre: 'c3', descripcion: 'descripcion del centro 3',
        imagen: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/3.jpg',
        video: 'IwLSrNu1ppI',
        fechaCreacion: new Date(), ultimaModificacion: new Date()
    },
    {
        id: 3, nombre: 'c4', descripcion: 'descripcion del centro 4',
        imagen: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/4.jpg',
        video: 'p7zevPed3Ss',
        fechaCreacion: new Date(), ultimaModificacion: new Date()
    },
    {
        id: 4, nombre: 'c5', descripcion: 'descripcion del centro 5',
        imagen: 'https://valor-software.com/ngx-bootstrap/assets/images/nature/5.jpg',
        video: 'tAGnKpE4NCI',
        fechaCreacion: new Date(), ultimaModificacion: new Date()
    }
];
