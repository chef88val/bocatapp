import { TestBed, inject } from '@angular/core/testing';

import { apirestService } from './apirest.service';

describe('apirestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [apirestService]
    });
  });

  it('should be created', inject([apirestService], (service: apirestService) => {
    expect(service).toBeTruthy();
  }));
});
