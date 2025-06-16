import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/note-list/note-list.component').then(m => m.NoteListComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/note-create-edit/note-create-edit.component').then(m => m.NoteCreateEditComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/note-item/note-item.component').then(m => m.NoteItemComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/note-create-edit/note-create-edit.component').then(m => m.NoteCreateEditComponent),
  },
];
