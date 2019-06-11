import { Component, OnInit } from '@angular/core';
import { Centro } from '../centro';
import { CentrosService } from '../centros.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-centro-list',
  templateUrl: './centro-list.component.html',
  styleUrls: ['./centro-list.component.css']
})
export class CentroListComponent implements OnInit {
  centros$: Observable<Centro[]>;

  constructor(private centrosService: CentrosService) { }

  ngOnInit() {
    this.getCentros();
  }

  getCentros = () => {
    return this.centros$ = this.centrosService.getCentros();
  }

}
