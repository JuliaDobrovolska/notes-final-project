import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Note} from '../models/note.module';
import {Observable} from 'rxjs';
import {SERVER_URL} from '../models/note.constant';

@Injectable({
  providedIn: 'root'
})
export class NoteHttpService {

  private readonly http = inject(HttpClient);


  getNoteList(): Observable<Note[]> {
    return this.http.get<Note[]>(SERVER_URL + '/user/notes');
  }


  getNote(id: string): Observable<Note> {
    return this.http.get<Note>(`${SERVER_URL}/user/notes/${id}`);
  }


  createNote(note: Note): Observable<any> {
    console.log("create note", note)
    return this.http.post(`${SERVER_URL}/user/notes`, note);
  }


  updateNote(id: string, note: Note): Observable<any> {
    return this.http.put(`${SERVER_URL}/user/notes/${id}`, note);
  }


  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${SERVER_URL}/user/notes/${id}`);
  }

}

