import {Component, OnInit, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {
  NzInputDirective,
} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent
} from 'ng-zorro-antd/form';
import {NzColDirective, NzGridModule} from 'ng-zorro-antd/grid';
import {NoteHttpService} from '../../services/note-http-service';
import {NoteSearchService} from '../note-search/note-search.service';

@Component({
  selector: 'app-note-create-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputDirective,
    NzButtonComponent,
    NzCardComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzFormDirective,
    NzColDirective,
    NzGridModule
  ],
  templateUrl: './note-create-edit.component.html',
  styleUrl: './note-create-edit.component.scss'
})
export class NoteCreateEditComponent implements OnInit {
  private readonly noteHttpService = inject(NoteHttpService);
  private readonly noteSearchService = inject(NoteSearchService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);

  noteForm!: FormGroup;
  cardTitle = '';
  noteId: string | null = null;
  isEditMode = false;

  ngOnInit(): void {
    this.initializeForm();
    this.loadNoteIfEditing();
  }

  private initializeForm(): void {
    this.noteForm = this.fb.group({
      title: [null, Validators.required],
      content: [null, Validators.required]
    });
  }

  private loadNoteIfEditing(): void {
    this.noteId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.noteId;
    this.cardTitle = this.isEditMode ? 'Редагувати нотатку' : 'Створити нотатку';

    if (this.isEditMode) {
      this.noteHttpService.getNote(this.noteId!).subscribe(note => {
        this.noteForm.patchValue(note);
      });
    }
  }

  saveNote(): void {
    if (this.noteForm.invalid) {
      this.markFormFieldsDirty();
      return;
    }

    const noteData = this.noteForm.getRawValue();
    const request$ = this.isEditMode
      ? this.noteHttpService.updateNote(this.noteId!, noteData)
      : this.noteHttpService.createNote(noteData);

    request$.subscribe(() => {
      this.noteSearchService.clearSearchTerm();
      this.router.navigate(['/notes'])
    });
  }

  private markFormFieldsDirty(): void {
    Object.values(this.noteForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({onlySelf: true});
      }
    });
  }
}
