import { TestBed, inject } from '@angular/core/testing';

import { ApiRestService } from './ApiRestService';

describe('ApiRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiRestService]
    });
  });

  it('should be created', inject([ApiRestService], (service: ApiRestService) => {
    expect(service).toBeTruthy();
  }));
});
