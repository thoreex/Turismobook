import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentrosService } from '../centros.service';
import { Centro } from '../centro';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-centro-detail',
  templateUrl: './centro-detail.component.html',
  styleUrls: ['./centro-detail.component.css']
})
export class CentroDetailComponent implements OnInit {
  centro: Centro;
  dangerousVideoUrl: string;
  videoUrl: SafeResourceUrl;

  constructor(private centrosService: CentrosService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getCentro();

    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + this.centro.video;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }

  getCentro() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.centrosService.getCentro(id).
      subscribe(centro => this.centro = centro);
  }

}
