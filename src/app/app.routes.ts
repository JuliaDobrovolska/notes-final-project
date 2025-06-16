import { Routes } from '@angular/router';
import {NoteCreateComponent} from './components/note-create/note-create.component';
import {NoteEditComponent} from './components/note-edit/note-edit.component';
import {NoteItemComponent} from './components/note-item/note-item.component';
import {NoteListComponent} from './components/note-list/note-list.component';

export const routes: Routes = [
  { path: '', component: NoteListComponent },
  { path: 'create', component: NoteCreateComponent },
  { path: ':id', component: NoteItemComponent },
  { path: 'edit/:id', component: NoteCreateComponent },
];
