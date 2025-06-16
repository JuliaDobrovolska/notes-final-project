import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCreateEditComponent } from './note-create-edit.component';

describe('NoteCreateComponent', () => {
  let component: NoteCreateEditComponent;
  let fixture: ComponentFixture<NoteCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteCreateEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
