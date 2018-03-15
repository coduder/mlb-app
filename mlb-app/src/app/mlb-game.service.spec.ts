import { TestBed, inject } from '@angular/core/testing';

import { MlbGameService } from './mlb-game.service';

describe('MlbGameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MlbGameService]
    });
  });

  it('should be created', inject([MlbGameService], (service: MlbGameService) => {
    expect(service).toBeTruthy();
  }));
});
