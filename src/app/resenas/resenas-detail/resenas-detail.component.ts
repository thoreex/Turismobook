import { Component, OnInit } from '@angular/core';
import { ResenasService } from '../resenas.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Resena } from '../resena';

@Component({
  selector: 'app-resenas-detail',
  templateUrl: './resenas-detail.component.html',
  styleUrls: ['./resenas-detail.component.css']
})
export class ResenasDetailComponent implements OnInit {
  resena: Resena;

  constructor(private resenasService: ResenasService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getResena();
  }

  getResena() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.resenasService.getResena(id).
      subscribe(resena => this.resena = resena);
  }

}
