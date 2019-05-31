import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { CharacterService } from '../../shared/service/character.service';
import { Character } from '../../shared/models/character.model';

/**
 * Character-post component uses an html form to GET by id, POST, and PUT character
 * traits to the database.
 */
@Component({
  selector: 'app-character-post',
  templateUrl: './character-post.component.html',
  styleUrls: ['./character-post.component.css']
})
export class CharacterPostComponent implements OnInit {
  /**
   * characterTitle property with empty string.
   */
  characterTitle = '';
  /**
   * characterDetail property with empty string.
   */
  characterDetail = '';
  /**
   * Local reference of Character.
   */
  character: Character;
  /**
   * mode property routes to create.
   */
  private mode = 'character/create';
  /**
   * characterId property string.
   */
  private characterId: string;

  /**
   * @ignore
   */
  constructor(public characterService: CharacterService, public route: ActivatedRoute) { }

  /**
   * Performs a GET by id function from the characterService, getting a single
   * character trait. Routes to edit or create mode, depending on the existence of an id.
   */
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('characterId')) {
        this.mode = 'character/edit';
        this.characterId = paramMap.get('characterId');
        this.characterService.getCharacter(this.characterId).subscribe(characterData => {
          this.character = {
            id: characterData._id,
            title: characterData.title,
            detail: characterData.detail,
            creator: characterData.creator
          };
        });
      } else { this.mode = 'character/create'; this.characterId = null; }
    });
  }
  /**
   * Performs POST and PUT functions from the characterService and resets the form.
   * @param form NgForm.
   */
  onSaveCharacter(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'character/create') {
      this.characterService.addCharacter(form.value.title, form.value.detail, form.value);
    } else {
      this.characterService.updateCharacter(this.characterId, form.value.title, form.value.detail, form.value);
    }
    form.resetForm();
  }

}
