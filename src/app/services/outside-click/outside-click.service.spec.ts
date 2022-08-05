import { TestBed } from '@angular/core/testing';

import { OutsideClickService } from './outside-click.service';

describe('OutsideClickService', () => {
  let service: OutsideClickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutsideClickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
