import { TestBed } from '@angular/core/testing';

import { ResenasService } from './resenas.service';

describe('ResenasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResenasService = TestBed.get(ResenasService);
    expect(service).toBeTruthy();
  });
});
