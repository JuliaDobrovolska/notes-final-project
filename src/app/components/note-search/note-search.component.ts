import {Component, inject} from '@angular/core';
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Note} from '../../models/note.module';
import {NoteService} from '../../services/note.service';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-note-search',
  imports: [
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzInputGroupComponent,
    NzIconDirective
  ],
  templateUrl: './note-search.component.html',
  styleUrl: './note-search.component.scss'
})
export class NoteSearchComponent {
  searchTerm = '';
  private readonly noteService = inject(NoteService);


  onSearch() {
    this.noteService.setSearchTerm(this.searchTerm);
  }


}
