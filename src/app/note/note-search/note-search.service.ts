import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Note} from '../../models/note.module';

@Injectable({
  providedIn: 'root'
})
export class NoteSearchService {

  private notes: Note[] = [];
  private readonly searchTerm$ = new BehaviorSubject<string>('');
  searchTermObs$ = this.searchTerm$.asObservable();


  setSearchTerm(term: string) {
    this.searchTerm$.next(term);
  }

  isSearchTermExist(): boolean {
    return this.searchTerm$.value != '';
  }

  clearSearchTerm() {
    this.searchTerm$.next('');
  }


  set notesList(notes: Note[]) {
    this.notes = notes;
  }

  get notesList() {
    return this.notes;
  }

  searchNotes(term: string): Note[] {
    return this.notes.filter(n => n.title.toLowerCase().includes(term.toLowerCase()));
  }
}
