import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Character } from './character.model';
import { stringify } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characters: Character[] = [];
  private charactersUpdated = new Subject <Character[]> ();
  constructor(private http: HttpClient, private router: Router) { }

  getCharacterUpdateListener() {
    return this.charactersUpdated.asObservable();
  }
  getCharacter(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      detail: string;
    }>('http://localhost:3000/api/characters' + id);
  }

  addCharacter(title: string, detail: string) {
    const character: Character = {id: null, title: title, detail: detail};
    this.http.post<{message: string; characterId: string}>('http://localhost:3000/api/characters', character)
    .subscribe(responseData => {
      const id = responseData.characterId;
      character.id = id;
      this.characters.push(character);
      this.charactersUpdated.next([...this.characters]);
      this.router.navigate(['/']);
    });
  }
}
