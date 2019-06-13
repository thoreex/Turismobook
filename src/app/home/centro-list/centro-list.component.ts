import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Centro } from 'src/app/centros/centro';
import { CentrosService } from 'src/app/centros/centros.service';

@Component({
  selector: 'app-centro-list',
  templateUrl: './centro-list.component.html',
  styleUrls: ['./centro-list.component.css']
})
export class CentroListComponent implements OnInit {
  centros$: BehaviorSubject<Centro[]>;

  constructor(private centrosService: CentrosService) { }

  ngOnInit() {
    this.getCentros();
  }

  getCentros = () => {
    return this.centros$ = this.centrosService.getCentros();
  }

}
