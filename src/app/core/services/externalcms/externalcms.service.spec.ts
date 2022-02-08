import { TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';

import { ApiService } from 'ish-core/services/api/api.service';

import { ExternalcmsService } from './externalcms.service';

describe('Externalcms Service', () => {
  let apiServiceMock: ApiService;
  let externalcmsService: ExternalcmsService;

  beforeEach(() => {
    apiServiceMock = mock(ApiService);
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useFactory: () => instance(apiServiceMock) }]
    });
    externalcmsService = TestBed.inject(ExternalcmsService);
  });

  it('should be created', () => {
    expect(externalcmsService).toBeTruthy();
  });
});
