import { Injectable } from '@angular/core';
import {Note} from '../models/note.module';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes: Note[] = [{title:"efwdsfdsfds", content:"dsddssd", id:1},{title:"22222", content:"dsddssd", id:2}];
  private idCounter = 0;
  private searchTerm$ = new BehaviorSubject<string>('');
  searchTermObs$ = this.searchTerm$.asObservable();

  getNotes(): Note[] {
    return this.notes;
  }

  getNote(id: number): Note | undefined {
    return this.notes.find(n => n.id === id);
  }

  addNote(note: Omit<Note, 'id'>): void {
    this.notes.push({ id: this.idCounter++, ...note });
  }

  updateNote(id: number, updated: Partial<Note>): void {
    const note = this.getNote(id);
    if (note) Object.assign(note, updated);
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter(n => n.id !== id);
  }

  setSearchTerm(term: string) {
    this.searchTerm$.next(term);
  }

  searchNotes(term: string): Note[] {
    return this.notes.filter(n => n.title.toLowerCase().includes(term.toLowerCase()));
  }
}
