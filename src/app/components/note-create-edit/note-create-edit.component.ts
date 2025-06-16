import {Component, inject, OnInit} from '@angular/core';
import {NoteService} from '../../services/note.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzAutosizeDirective, NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzGridModule} from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-note-create',
  imports: [
    FormsModule,
    NzInputDirective,
    NzButtonComponent,
    NzCardComponent,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzColDirective,
    NzFormDirective,
    NzGridModule
  ],
  templateUrl: './note-create-edit.component.html',
  styleUrl: './note-create-edit.component.scss'
})
export class NoteCreateEditComponent implements OnInit {

  private readonly noteService = inject(NoteService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);

  noteForm!: FormGroup;
  cardTitle = '';
  noteId!: number;
  mode: 'create' | 'edit' = 'create';


  ngOnInit() {
    this.initializeForm();
    this.patchFormDuringUpdate();


  }

  saveNote() {
    if (this.noteForm?.valid) {
      console.log(this.mode)
      this.mode == 'create' ? this.noteService.addNote(this.noteForm.getRawValue()) :
        this.noteService.updateNote(this.noteId, this.noteForm.getRawValue());
      this.router.navigate(['/']);
    } else {
      Object.values(this.noteForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }


  private initializeForm() {
    this.noteForm = this.fb.group({
      title: [null, Validators.required],
      content: [null, Validators.required]
    });
  }

  private patchFormDuringUpdate() {
    this.mode = this.route.snapshot.paramMap.get('id') ? 'edit' : 'create';
    if (this.mode == 'create') return;

    this.noteId = Number(this.route.snapshot.paramMap.get('id'));
    const note = this.noteService.getNote(this.noteId);
    if (note) {
      this.noteForm.patchValue(note);
      this.cardTitle = 'Редагувати нотатку';
    } else {
      this.cardTitle = 'Створити нотатку';
    }
  }
}

