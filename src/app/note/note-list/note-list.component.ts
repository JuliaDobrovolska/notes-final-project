import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {NoteService} from '../../services/note.service';
import {Note} from '../../models/note.module';
import {FormsModule} from '@angular/forms';
import {NzListComponent, NzListItemComponent} from 'ng-zorro-antd/list';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {RouterLink} from '@angular/router';
import {NzColDirective, NzGridModule, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {BehaviorSubject} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';
import {NzAvatarComponent} from 'ng-zorro-antd/avatar';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-note-list',
  imports: [
    FormsModule,
    NzListComponent,
    RouterLink,
    NzRowDirective,
    NzColDirective,
    NzCardComponent,
    NzEmptyComponent,
    NzCardMetaComponent,
    NzAvatarComponent,
    NzIconDirective,
    NzGridModule,
    NzTooltipDirective,
    NzPopconfirmModule
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent implements OnInit {

  private readonly noteService = inject(NoteService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly nzMessageService = inject(NzMessageService);


  notes: Note[] = [];
  filteredNotes: Note[] = [];
  searchTerm = '';


  ngOnInit() {
    this.notes = this.noteService.getNotes();
    this.noteService.searchTermObs$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(term => {
      this.filteredNotes = this.noteService.searchNotes(term);
    });
    this.filteredNotes = [...this.notes];
  }

  onSearch() {
    this.filteredNotes = this.noteService.searchNotes(this.searchTerm);
  }

  onDelete(id: number) {
    this.noteService.deleteNote(id);
    this.nzMessageService.info('Нотатку видалено');
    this.onSearch();
  }

}
