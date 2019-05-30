import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Character } from '../models/character.model';
import { environment } from '../../../environments/environment';

/**
 * This variable connects the frontend to the backend's api route.
 */
const backendURL = environment.apiURL + '/characters/';
/**
 * Character service for character-list and character-post components.
 * See {@link Character} for class model.
 */
@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  /**
   * characters property used to reference an array of character data.
   */
  private characters: Character[] = [];
  /**
   * charactersUpdated property used to reference a new Subject and Character array.
   */
  private charactersUpdated = new Subject<Character[]>();

  /**
   * @ignore
   */
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * This function is used to retrieve a list of character traits from the database using
   * the http GET method.
   */
  getCharacters() {
    this.http.get<{ message: string; characters: any }>(backendURL)
      .pipe(map(characterData => {
        return characterData.characters.map(character => {
          return {
            title: character.title,
            detail: character.detail,
            id: character._id,
            creator: character.creator
          };
        });
      }))
      .subscribe(formedCharacters => {
        this.characters = formedCharacters;
        this.charactersUpdated.next([...this.characters]);
      });
  }

  /**
   * This function is used to return the charactersUpdated property and update
   * the character trait list.
   */
  getCharacterUpdateListener() {
    return this.charactersUpdated.asObservable();
  }

  /**
   * This function is used to get a character trait by its id using the http GET method.
   * @param id of type string.
   */
  getCharacter(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      detail: string;
      creator: string;
    }>(backendURL + id);
  }

  /**
   * This function creates a new character trait using the http POST method.
   * @param title of type string.
   * @param detail of type string.
   */
  addCharacter(title: string, detail: string, creator: string) {
    const character: Character = { id: null, title, detail, creator };
    this.http.post<{ message: string; characterId: string }>(backendURL, character)
      .subscribe(responseData => {
        const id = responseData.characterId;
        character.id = id;
        this.characters.push(character);
        this.charactersUpdated.next([...this.characters]);
        this.router.navigate(['/characters']);
      });
  }

  /**
   * This function updates a character trait using the http PUT method.
   * @param id string.
   * @param title string.
   * @param detail string.
   */
  updateCharacter(id: string, title: string, detail: string, creator: string) {
    const character: Character = { id, title, detail, creator };
    this.http.put(backendURL + id, character)
      .subscribe(response => {
        const updatedCharacters = [...this.characters];
        const oldCharacterIndex = updatedCharacters.findIndex(c => c.id === character.id);
        updatedCharacters[oldCharacterIndex] = character;
        this.charactersUpdated.next([...this.characters]);
        this.router.navigate(['/characters']);
      });
  }

  /**
   * This function deletes a character trait using the http DELETE method.
   * @param characterId string.
   */
  deleteCharacter(characterId: string) {
    this.http.delete(backendURL + characterId)
      .subscribe(() => {
        const updatedCharacters = this.characters.filter(character => character.id !== characterId);
        this.characters = updatedCharacters;
        this.charactersUpdated.next([...this.characters]);
      });
  }
}

