import {TestBed} from '@angular/core/testing';

import {NoteSearchService} from './note-search.service';

describe('NoteSearchService', () => {
  let service: NoteSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
