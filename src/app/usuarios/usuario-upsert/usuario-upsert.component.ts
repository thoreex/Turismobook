import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../usuarios.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertService } from 'src/app/alert.service';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-upsert',
  templateUrl: './usuario-upsert.component.html',
  styleUrls: ['./usuario-upsert.component.css']
})
export class UsuarioUpsertComponent implements OnInit {
  private id: string;
  public formGroup: FormGroup;
  public usuario$: BehaviorSubject<Usuario>;
  private ref: AngularFireStorageReference;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private usuariosService: UsuariosService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private storage: AngularFireStorage,
              private alertService: AlertService) { }

    ngOnInit() {
      this.id = this.route.snapshot.params.id;
      this.iniciarUsuario();
      if (this.id) {
        this.cargarUsuario(this.id);
      }
    }

    iniciarUsuario = () => {
      this.formBuilder = new FormBuilder();
      this.formGroup = this.formBuilder.group({
        id: ['(nueva)', [Validators.required]],
        nombre: ['', [Validators.required]],
        fechaCreacion: [new Date()],
        ultimaModificacion: [''],
        fechaEliminacion: [''],
      });
    }

    guardarResena = () => {
      if (this.formGroup.valid) {
        // agregamos la resena duplicado a usuario y centro
        this.usuario$.pipe(
          take(1)
        ).subscribe(usuario => {
          const nuevoUsuario: Usuario = usuario;
          nuevoUsuario.nombre = this.formGroup.value.nombre;
          if (this.id) {
            this.usuariosService.updateUsuario(this.id, nuevoUsuario);
            this.alertService.showAlert('Usuario actualizado', false);
          } else {
            this.id = this.usuariosService.addUsuario(nuevoUsuario);
            this.alertService.showAlert('Usuario agregado', false);
          }
          this.router.navigate(['/usuarios', this.id]);
        });
      }
    }

    cargarUsuario = (id: string) => {
      this.usuario$ = this.usuariosService.getUsuario(id);
      this.usuario$.subscribe(usuario => {
        if (usuario) {
          this.formBuilder = new FormBuilder();
          this.formGroup = this.formBuilder.group({
            id: [id, [Validators.required]],
            nombre: [usuario.nombre, [Validators.required]],
            fechaCreacion: [usuario.fechaCreacion],
            ultimaModificacion: [usuario.ultimaModificacion],
            fechaEliminacion: [usuario.fechaEliminacion],
          });
        }
      });
    }
}
