import { Component, OnInit } from '@angular/core';
import { Centro } from '../centro';
import { CentrosService } from '../centros.service';

@Component({
  selector: 'app-centro-search',
  templateUrl: './centro-search.component.html',
  styleUrls: ['./centro-search.component.css']
})
export class CentroSearchComponent implements OnInit {
  centros: Centro[] = [];
  filteredCentros: Centro[] = [];
  vacio = false;

  constructor(private centrosService: CentrosService) { }

  ngOnInit() {
    this.getCentros();
  }

  getCentros = () => {
    return this.centrosService.getCentros().subscribe(centros => this.centros = centros);
  }

  searchCentros = (term: string) => {
    this.vacio = true;

    if (!term) {
      this.filteredCentros = [];
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
