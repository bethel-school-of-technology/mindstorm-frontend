import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Character } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characters: Character[] = [];
  private charactersUpdated = new Subject<Character[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getCharacters() {
    this.http.get<{ message: string; characters: any }>('http://localhost:3000/api/characters')
      .pipe(map(characterData => {
        return characterData.characters.map(character => {
          return {
            title: character.title,
            detail: character.detail,
            id: character._id
          };
        });
      }))
      .subscribe(formedCharacters => {
        this.characters = formedCharacters;
        this.charactersUpdated.next([...this.characters]);
      });
  }
  getCharacterUpdateListener() {
    return this.charactersUpdated.asObservable();
  }
  getCharacter(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      detail: string
    }>('http://localhost:3000/api/characters/' + id);
  }

  addCharacter(title: string, detail: string) {
    const character: Character = { id: null, title, detail };
    this.http.post<{ message: string; characterId: string }>('http://localhost:3000/api/characters', character)
      .subscribe(responseData => {
        const id = responseData.characterId;
        character.id = id;
        this.characters.push(character);
        this.charactersUpdated.next([...this.characters]);
        this.router.navigate(['/getChar']);
      });
  }

  updateCharacter(id: string, title: string, detail: string) {
    const character: Character = { id, title, detail };
    this.http.put('http://localhost:3000/api/characters/' + id, character)
      .subscribe(response => {
        const updatedCharacters = [...this.characters];
        const oldCharacterIndex = updatedCharacters.findIndex(c => c.id === character.id);
        updatedCharacters[oldCharacterIndex] = character;
        this.charactersUpdated.next([...this.characters]);
        this.router.navigate(['/getChar']);
      });
  }

  deleteCharacter(characterId: string) {
    this.http.delete('http://localhost:3000/api/characters/' + characterId)
      .subscribe(() => {
        const updatedCharacters = this.characters.filter(character => character.id !== characterId);
        this.characters = updatedCharacters;
        this.charactersUpdated.next([...this.characters]);
      });
  }
}

