import {Routes} from '@angular/router';
import {AuthComponent} from './auth/component/auth.component';
import {canActivateAuthGuard} from './auth/guards/canActivateAuth.guard';

export const routes: Routes = [

  {path: '', redirectTo: '/notes', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {
    path: 'notes', children: [
      {
        path: '',
        loadComponent: () =>
          import('./note/note-list/note-list.component').then(m => m.NoteListComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./note/note-create-edit/note-create-edit.component').then(m => m.NoteCreateEditComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./note/note-item/note-item.component').then(m => m.NoteItemComponent),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./note/note-create-edit/note-create-edit.component').then(m => m.NoteCreateEditComponent),
      },

    ], canActivate: [() => canActivateAuthGuard()]
  },
  {path: '**', redirectTo: '/auth', pathMatch: 'full'},


];
