import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResenasService } from '../resenas.service';
import { CentrosService } from '../../centros.service';
import { ComentariosService } from '../comentarios.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/alert.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Comentario } from '../comentario';
import { Resena } from '../resena';
import { take } from 'rxjs/operators';
import { Usuario } from 'src/app/usuarios/usuario';
import { Centro } from '../../centro';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';

@Component({
  selector: 'app-comentarios-upsert',
  templateUrl: './comentarios-upsert.component.html',
  styleUrls: ['./comentarios-upsert.component.css']
})
export class ComentariosUpsertComponent implements OnInit {
  private idComentario: string;
  private idResena: string;
  public formGroup: FormGroup;
  public Crear = '-1';
  public comentario$: BehaviorSubject<Comentario>;
  public resena$: BehaviorSubject<Resena>;
  public usuarios$: BehaviorSubject<Usuario[]>;
  public centros$: BehaviorSubject<Centro[]>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private resenasService: ResenasService,
              private comentariosService: ComentariosService,
              private centrosService: CentrosService,
              private usuariosService: UsuariosService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private alertService: AlertService) { }

  ngOnInit() {
    this.idResena = this.route.parent.snapshot.params.id;
    if (this.idResena) {
      this.resena$ = this.resenasService.getResena(this.idResena);
    }

    this.idComentario = this.route.snapshot.params.id;
    this.iniciarComentario();
    if (this.idComentario) {
      this.cargarComentario(this.idComentario);
    }

    this.usuarios$ = this.usuariosService.getUsuarios();
    this.centros$ = this.centrosService.getCentros();
  }

  iniciarComentario = () => {
    this.formBuilder = new FormBuilder();
    this.formGroup = this.formBuilder.group({
      id: ['(nueva)', [Validators.required]],
      comentario: ['', [Validators.required]],
      fechaCreacion: [new Date()],
      ultimaModificacion: [new Date()],
      fechaEliminacion: [''],
    });
  }

  guardarComentario = () => {
    if (this.formGroup.valid) {
      // agregamos la resena duplicado a usuario y centro
      combineLatest(
        this.authService.usuario$,
        this.resena$,
        this.usuarios$,
        this.centros$
      ).pipe(take(1)).subscribe(([usuario, resena, usuarios, centros]) => {
        if (usuario && resena && usuarios && centros) {
          /*if (!usuario.comentarios) {
            usuario.comentarios = [];
          }*/
          if (!resena.comentarios) {
            resena.comentarios = [];
          }
          // datos limpios
          const resenaLimpio = {
            id: resena.id, usuario: resena.usuario, centro: resena.centro
          };
          const usuarioLimpio = {
            id: usuario.id, nombre: usuario.nombre, imagen: usuario.imagen
          };
          const nuevoComentario = {
            resena: resenaLimpio, usuario: usuarioLimpio,
            comentario: this.formGroup.value.comentario, fechaCreacion: this.formGroup.value.fechaCreacion,
            ultimaModificacion: this.formGroup.value.ultimaModificacion, fechaEliminacion: this.formGroup.value.fechaEliminacion
          };
          if (this.idComentario) {
            this.comentariosService.updateComentario(this.idComentario, nuevoComentario);
            this.alertService.showAlert('Comentario actualizado', false);
          } else {
            this.idComentario = this.comentariosService.addComentario(nuevoComentario);
            this.alertService.showAlert('Comentario agregado', false);
          }
          // agregar/modificar al usuario
          /*const cindex = usuario.resenas.findIndex(resena => resena.centro.id === centro.id);
          const cresena = {
            id: this.idResena, centro: centroLimpio,
            valoracion: this.formGroup.value.valoracion, titulo: this.formGroup.value.titulo,
            resena: this.formGroup.value.resena, fechaCreacion: this.formGroup.value.fechaCreacion,
            ultimaModificacion: this.formGroup.value.ultimaModificacion, fechaEliminacion: this.formGroup.value.fechaEliminacion
          };
          if (cindex > -1) {
            usuario.resenas[cindex] = cresena;
          } else {
            usuario.resenas.push(cresena);
          }*/
          // agregar/modificar a la resena
          const rindex = resena.comentarios.findIndex(comentario => comentario.id === this.idComentario);
          const rcomentario = {
            id: this.idComentario, usuario: usuarioLimpio,
            comentario: this.formGroup.value.comentario, fechaCreacion: this.formGroup.value.fechaCreacion,
            ultimaModificacion: this.formGroup.value.ultimaModificacion, fechaEliminacion: this.formGroup.value.fechaEliminacion
          };
          if (rindex > -1) {
            resena.comentarios[rindex] = rcomentario;
          } else {
            resena.comentarios.push(rcomentario);
          }
          // agregar/modificar a los centros
          centros.forEach(centro => {
            if (centro.resenas) {
              const cresenaindex = centro.resenas.findIndex(r => r.id === this.idResena);
              if (cresenaindex > -1) {
                if (!centro.resenas[cresenaindex].comentarios) {
                  centro.resenas[cresenaindex].comentarios = [];
                }

                const ccomentarioindex = centro.resenas[cresenaindex].comentarios.findIndex(c => c.id === this.idComentario);
                const ccomentario = {
                  id: this.idComentario, usuario: usuarioLimpio,
                  comentario: this.formGroup.value.comentario, fechaCreacion: this.formGroup.value.fechaCreacion,
                  ultimaModificacion: this.formGroup.value.ultimaModificacion, fechaEliminacion: this.formGroup.value.fechaEliminacion
                };
                if (ccomentarioindex > -1) {
                  centro.resenas[cresenaindex].comentarios[ccomentarioindex] = ccomentario;
                } else {
                  centro.resenas[cresenaindex].comentarios.push(ccomentario);
                }
              }
            }

            this.centrosService.updateCentro(centro.id, centro);
          });
          // agregar/modificar a los usuarios
          usuarios.forEach(u => {
            if (u.resenas) {
              const uresenaindex = u.resenas.findIndex(r => r.id === this.idResena);
              if (uresenaindex > -1) {
                if (!u.resenas[uresenaindex].comentarios) {
                  u.resenas[uresenaindex].comentarios = [];
                }

                const ucomentarioindex = u.resenas[uresenaindex].comentarios.findIndex(c => c.id === this.idComentario);
                const ucomentario = {
                  id: this.idComentario, usuario: usuarioLimpio,
                  comentario: this.formGroup.value.comentario, fechaCreacion: this.formGroup.value.fechaCreacion,
                  ultimaModificacion: this.formGroup.value.ultimaModificacion, fechaEliminacion: this.formGroup.value.fechaEliminacion
                };
                if (ucomentarioindex > -1) {
                  u.resenas[uresenaindex].comentarios[ucomentarioindex] = ucomentario;
                } else {
                  u.resenas[uresenaindex].comentarios.push(ucomentario);
                }
              }
            }

            this.usuariosService.updateUsuario(u.id, u);
          });
          this.router.navigate(['../reviews', this.idResena]);
        }
      });
    }
  }

  cargarComentario = (id: string) => {
    this.comentario$ = this.comentariosService.getComentario(id);
    this.comentario$.subscribe(comentario => {
      if (comentario) {
        this.formBuilder = new FormBuilder();
        this.formGroup = this.formBuilder.group({
          id: [id, [Validators.required]],
          comentario: [comentario.comentario, [Validators.required]],
          fechaCreacion: [comentario.fechaCreacion],
          ultimaModificacion: [comentario.ultimaModificacion],
          fechaEliminacion: [comentario.fechaEliminacion],
        });
      }
    });
  }
}
