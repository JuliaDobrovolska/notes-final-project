import {Component, inject, OnInit} from '@angular/core';
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NoteSearchService} from './note-search.service';
import {Router} from '@angular/router';

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
export class NoteSearchComponent implements OnInit {
  searchTerm = '';
  private readonly noteSearchService = inject(NoteSearchService);
  private readonly router = inject(Router);


  ngOnInit() {
    this.noteSearchService.searchTermObs$.subscribe(term => {
      this.searchTerm = term;
    });
  }


  onSearch() {
    this.router.navigate(['/notes']);
    this.noteSearchService.setSearchTerm(this.searchTerm);
  }


}
