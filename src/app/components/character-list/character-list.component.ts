import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from '../../shared/character.model';
import { CharacterService } from '../../shared/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit, OnDestroy {
  characters: Character[] = [];
  private characterSub: Subscription;

  constructor(public characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.getCharacters();
    this.characterSub = this.characterService.getCharacterUpdateListener()
      .subscribe((characters: Character[]) => {
        this.characters = characters;
      });
  }
  onDelete(characterId: string) {
    this.characterService.deleteCharacter(characterId);
  }

  ngOnDestroy() {
    this.characterSub.unsubscribe();
  }
}
