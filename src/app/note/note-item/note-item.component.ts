import {Component, DestroyRef, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Note} from '../../models/note.module';
import {NzAvatarComponent} from 'ng-zorro-antd/avatar';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NoteHttpService} from '../../services/note-http-service';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NgIf} from '@angular/common';
import {NoteSearchService} from '../note-search/note-search.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-note-item',
  imports: [
    NzAvatarComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzIconDirective,
    RouterLink,
    NzEmptyComponent,
    NzTooltipDirective,
    NzPopconfirmModule,
    NzSpinComponent,
    NgIf,

  ],
  templateUrl: './note-item.component.html',
  styleUrl: './note-item.component.scss'
})
export class NoteItemComponent {

  note!: Note | undefined;
  isLoading = true;

  private readonly noteHttpService = inject(NoteHttpService);
  protected readonly noteSearchService = inject(NoteSearchService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly nzMessageService = inject(NzMessageService);
  private readonly destroyRef = inject(DestroyRef);


  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.noteHttpService.getNote(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (note) => {
        this.note = note;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }


  onDelete(id: string) {
    this.noteHttpService.deleteNote(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.nzMessageService.info('Нотатку видалено');
      this.noteSearchService.clearSearchTerm();
      this.router.navigate(['/notes']);
    })


  }
}
