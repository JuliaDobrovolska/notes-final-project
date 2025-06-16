import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Note} from '../../models/note.module';
import {NoteService} from '../../services/note.service';
import {NgIf} from '@angular/common';
import {NzAvatarComponent} from 'ng-zorro-antd/avatar';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzMessageService} from 'ng-zorro-antd/message';

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

  ],
  templateUrl: './note-item.component.html',
  styleUrl: './note-item.component.scss'
})
export class NoteItemComponent {
  note!: Note | undefined;
  private readonly noteService = inject(NoteService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly nzMessageService=  inject(NzMessageService);


  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.note = this.noteService.getNote(id);
  }


  onDelete(id: number) {
    this.noteService.deleteNote(id);
    this.nzMessageService.info('Нотатку видалено');
    this.router.navigate(['/']);

  }
}
