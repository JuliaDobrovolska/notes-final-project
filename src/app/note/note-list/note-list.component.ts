import {Component, DestroyRef, inject, OnInit} from '@angular/core';
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
import {NoteHttpService} from '../../services/note-http-service';
import {NoteSearchService} from '../note-search/note-search.service';

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

  private readonly noteHttpService = inject(NoteHttpService);
  protected readonly noteSearchService = inject(NoteSearchService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly nzMessageService = inject(NzMessageService);

  filteredNotes: Note[] = [];

  constructor() {
    this.noteSearchService.isSearchTermExist() ? this.onSearch() : this.getNoteList();

  }

  ngOnInit() {
    this.onSearch();

  }

  private getNoteList() {
    this.noteHttpService.getNoteList().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(notes => {
      this.noteSearchService.notesList = notes;
      this.filteredNotes = [...this.noteSearchService.notesList];
    });
  }

  onSearch() {
    this.noteSearchService.searchTermObs$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(term => {
      this.filteredNotes = this.noteSearchService.searchNotes(term);
    });
  }

  onDelete(id: string) {
    this.noteHttpService.deleteNote(id).subscribe(() => {
      this.nzMessageService.info('Нотатку видалено');
      this.noteSearchService.clearSearchTerm();
      this.getNoteList();
    })

  }

}
