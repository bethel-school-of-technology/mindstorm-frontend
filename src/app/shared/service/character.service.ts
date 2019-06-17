import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Character } from '../models/character.model';
import { environment } from '../../../environments/environment';

/**
 * This variable connects the frontend to the backend's api route
 * and is stored in the environment folder.
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
  /** characters references an array of character data */
  private characters: Character[] = [];

  /** charactersUpdated references a new Subject and Character array */
  private charactersUpdated = new Subject<{ characters: Character[] }>();

  /** @ignore */
  constructor(private http: HttpClient, private router: Router) { }

  /** Performs a GET method to retrieve a list of character traits. */
  getCharacters() {
    this.http
    .get<{ message: string; characters: any }>(backendURL)
      .pipe(map(characterData => {
        return {
          characters: characterData.characters.map(character => {
            return {
              title: character.title,
              detail: character.detail,
              id: character._id,
              creator: character.creator
            };
          })
        };
      })
    )
    .subscribe(transFormedCharacterData => {
      this.characters = transFormedCharacterData.characters;
      this.charactersUpdated.next({
        characters: [...this.characters]
      });
    });
  }

  /** Returns the charactersUpdated property and updates the character trait list. */
  getCharacterUpdateListener() {
    return this.charactersUpdated.asObservable();
  }

  /**
   * Performs a GET by id request for a character trait.
   * @param id string
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
   * Creates a new character trait using the http POST method.
   * @param title string
   * @param detail string
   * @param creator string
   */
  addCharacter(title: string, detail: string, creator: string) {
    const characterData: Character = { id: null, title, detail, creator };
    this.http.post<{ message: string; characterId: string }>(backendURL, characterData)
      .subscribe(responseData => {
        const id = responseData.characterId;
        characterData.id = id;
        this.characters.push(characterData);
        this.charactersUpdated.next({
          characters: [...this.characters]
        });
        this.router.navigate(['/characters']);
      });
  }

  /**
   * Updates a character trait using the http PUT method.
   * @param id string
   * @param title string
   * @param detail string
   * @param creator string
   */
  updateCharacter(id: string, title: string, detail: string, creator: string) {
    const character: Character = { id, title, detail, creator };
    this.http.put(backendURL + id, character)
      .subscribe(response => {
        const updatedCharacters = [...this.characters];
        const oldCharacterIndex = updatedCharacters.findIndex(c => c.id === character.id);
        updatedCharacters[oldCharacterIndex] = character;
        this.charactersUpdated.next({
          characters: [...this.characters]
        });
        this.router.navigate(['/characters']);
      });
  }

  /**
   * Deletes a character trait using the http DELETE method.
   * @param characterId string
   */
  deleteCharacter(characterId: string) {
    this.http.delete(backendURL + characterId)
      .subscribe(() => {
        const updatedCharacters = this.characters.filter(character => character.id !== characterId);
        this.characters = updatedCharacters;
        this.charactersUpdated.next({
          characters: [...this.characters]
        });
      });
    }
  }
