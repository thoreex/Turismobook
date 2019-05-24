import { Component, OnInit } from '@angular/core';
import { CentrosService } from 'src/app/centros/centros.service';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { Centro } from 'src/app/centros/centro';
import { Usuario } from 'src/app/usuarios/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-editores',
  templateUrl: './manage-editores.component.html',
  styleUrls: ['./manage-editores.component.css']
})
export class ManageEditoresComponent implements OnInit {
  mensajeError: string;
  error: boolean;

  singleSelect: any = [];
  multiSelect: any = [];
  stringArray: any = [];
  objectsArray: any = [];
  stringOptions = [
    'Burns Dalton', 'Mcintyre Lawson', 'Amie Franklin', 'Jocelyn Horton', 'Fischer Erickson', 'Medina Underwood', 'Goldie Barber'
  ];
  config = { displayKey: 'name', search: true, placeholder: 'pick one' };
  selectedOptions = [{
    _id: '5a66d6c31d5e4e36c7711b7a',
    index: 0,
    balance: '$2,806.37',
    picture: 'http://placehold.it/32x32',
    name: 'Burns Dalton'
  },
  {
    _id: '5a66d6c3657e60c6073a2d22',
    index: 1,
    balance: '$2,984.98',
    picture: 'http://placehold.it/32x32',
    name: 'Mcintyre Lawson'
  }];
  options = [
    {
      _id: '5a66d6c31d5e4e36c7711b7a',
      index: 0,
      balance: '$2,806.37',
      picture: 'http://placehold.it/32x32',
      name: 'Burns Dalton'
    },
    {
      _id: '5a66d6c3657e60c6073a2d22',
      index: 1,
      balance: '$2,984.98',
      picture: 'http://placehold.it/32x32',
      name: 'Mcintyre Lawson'
    },
    {
      _id: '5a66d6c376be165a5a7fae33',
      index: 2,
      balance: '$2,794.16',
      picture: 'http://placehold.it/32x32',
      name: 'Amie Franklin'
    },
    {
      _id: '5a66d6c3f7854b6b4d96333b',
      index: 3,
      balance: '$2,537.14',
      picture: 'http://placehold.it/32x32',
      name: 'Jocelyn Horton'
    },
    {
      _id: '5a66d6c31f967d4f3e9d84e9',
      index: 4,
      balance: '$2,141.42',
      picture: 'http://placehold.it/32x32',
      name: 'Fischer Erickson'
    },
    {
      _id: '5a66d6c34cfa8cddefb31602',
      index: 5,
      balance: '$1,398.60',
      picture: 'http://placehold.it/32x32',
      name: 'Medina Underwood'
    },
    {
      _id: '5a66d6c3d727c450794226de',
      index: 6,
      balance: '$3,915.65',
      picture: 'http://placehold.it/32x32',
      name: 'Goldie Barber'
    }
  ];
  selectForm: FormGroup;
  constructor(private centrosSevice: CentrosService, private usuariosService: UsuariosService, private fromBuilder: FormBuilder) {
    this.selectForm = this.fromBuilder.group({
      selectDrop: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  asignar(idEditor: number, idCentro: number) {
    const oUsuario = this.usuariosService.getUsuario(idEditor);
    const oCentro = this.centrosSevice.getCentro(idCentro);
    let c: Centro;
    let u: Usuario;
    this.error = false;

    oCentro.subscribe(centro => c = centro);
    oUsuario.subscribe(usuario => u = usuario);

    if (c) {
      if (!c.editor) {
        if (u) {
          if (u.rol === 'Editor') {
            if (u.centros) {
              u.centros.push({ id: c.id, nombre: c.nombre, descripcion: c.descripcion, imagen: c.imagen });
            } else {
              u.centros = [{ id: c.id, nombre: c.nombre, descripcion: c.descripcion, imagen: c.imagen }];
            }
            c.editor = { id: u.id, nombre: u.nombre };
          } else {
            this.mensajeError = 'El usuario no es editor!';
            this.error = true;
          }
        } else {
          this.mensajeError = 'El usuario no existe!';
          this.error = true;
        }
      } else {
        this.mensajeError = 'Centro ya tiene asociado un editor!';
        this.error = true;
      }
    } else {
      this.mensajeError = 'No existe el centro!';
      this.error = true;
    }
    console.log('Centro:' + JSON.stringify(c));
    console.log('Usuario:' + JSON.stringify(u));
  }
}
