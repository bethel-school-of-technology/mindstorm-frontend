import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from '../../shared/character.model';
import { CharacterService } from '../../shared/character.service';

/**
 * Character-list component gets a list of character traits from the database.
 */
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit, OnDestroy {
  /**
   * characters property used to reference an array of character data.
   */
  characters: Character[] = [];
  /**
   * characterSub property with a type of Subscription from rxjs library.
   * Unsubscribes in ngOnDestroy function.
   */
  private characterSub: Subscription;

  /**
   *  @ignore
   */
  constructor(public characterService: CharacterService) { }

  /**
   * ngOnInit function performs a GET request for list of character traits
   * from the database.
   */
  ngOnInit() {
    this.characterService.getCharacters();
    this.characterSub = this.characterService.getCharacterUpdateListener()
      .subscribe((characters: Character[]) => {
        this.characters = characters;
      });
  }

  /**
   * Performs a delete function from the characterService on a button click.
   * @param characterId of type string.
   */
  onDelete(characterId: string) {
    this.characterService.deleteCharacter(characterId);
  }

  /**
   * Performs an unsubscribe method when onDelete() is clicked.
   */
  ngOnDestroy() {
    this.characterSub.unsubscribe();
  }
}
