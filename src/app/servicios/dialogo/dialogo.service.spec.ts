import { TestBed } from '@angular/core/testing';

import { DialogoService } from './dialogo.service';

describe('SplashService', () => {
  let service: DialogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
