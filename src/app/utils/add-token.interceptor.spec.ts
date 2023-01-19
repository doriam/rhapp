import { TestBed } from '@angular/core/testing';

import { AddTokenInterceptor } from './add-token.interceptor';

describe('AddTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddTokenInterceptor = TestBed.inject(AddTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
