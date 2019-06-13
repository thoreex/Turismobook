import { Component, OnInit } from '@angular/core';
import { ResenasService } from '../resenas.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Resena } from '../resena';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-resenas-detail',
  templateUrl: './resenas-detail.component.html',
  styleUrls: ['./resenas-detail.component.css']
})
export class ResenasDetailComponent implements OnInit {
  resena$: BehaviorSubject<Resena>;

  constructor(private resenasService: ResenasService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getResena();
  }

  getResena() {
    const id = this.route.snapshot.paramMap.get('id');
    this.resena$ = this.resenasService.getResena(id);
  }

}
