import { Component, OnInit } from '@angular/core';

import { Centro } from '../../centros/centro';
import { CentrosService } from '../../centros/centros.service';

@Component({
  selector: 'app-search-centros',
  templateUrl: './search-centros.component.html',
  styleUrls: ['./search-centros.component.css']
})
export class SearchCentrosComponent implements OnInit {
  centros: Centro[] = [];
  filteredCentros: Centro[] = [];
  vacio = false;
  constructor(private centrosService: CentrosService) { }

  ngOnInit() {
    this.getCentros();
  }

  getCentros = () => {
    return this.centrosService.getCentros().subscribe(centros => this.centros = this.filteredCentros = centros);
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

  borrarData = () => {
  }

}
