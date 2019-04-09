import { Component, OnInit } from '@angular/core';
import { Centro } from '../centro';
import { CentrosService } from '../centros.service';

@Component({
  selector: 'app-centro-list',
  templateUrl: './centro-list.component.html',
  styleUrls: ['./centro-list.component.css']
})
export class CentroListComponent implements OnInit {
  centros: Centro[] = [];
  filteredCentros: Centro[] = [];
  vacio = false;

  constructor(private centrosService: CentrosService) { }

  ngOnInit() {
    this.getCentros();
    this.filteredCentros = this.centros;
  }

  getCentros = () => {
    return this.centrosService.getCentros().subscribe(centros => this.centros = centros);
  }

  searchCentros = (term: string) => {
    this.vacio = true;

    if (!term) {
      this.filteredCentros = this.centros;
      this.vacio = false;
    } else {
      term = term.toLowerCase();
      this.filteredCentros = [];
      this.centros.forEach((item) => {
        if (item.nombre.toLowerCase().includes(term)) {
          this.filteredCentros.push(item);
        }
      });
    }

    if (this.filteredCentros.length > 0) {
      this.vacio = false;
    }
  }

}
