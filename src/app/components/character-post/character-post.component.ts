import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { CharacterService } from '../../shared/character.service';
import { Character } from '../../shared/character.model';

/**
 * Character-post component uses an html form to GET by id, POST, PUT character
 * traits to the database.
 */
@Component({
  selector: 'app-character-post',
  templateUrl: './character-post.component.html',
  styleUrls: ['./character-post.component.css']
})
export class CharacterPostComponent implements OnInit {
  /**
   * characterTitle property with a type of empty string.
   */
  characterTitle = '';
  /**
   * characterDetail property with a type of empty string.
   */
  characterDetail = '';
  /**
   * character property with type Character.
   */
  character: Character;
  /**
   * mode property routes to create.
   */
  private mode = 'create';
  /**
   * characterId property with type string.
   */
  private characterId: string;

  /**
   * @ignore
   */
  constructor(public characterService: CharacterService, public route: ActivatedRoute) { }

  /**
   * Performs a GET by id function from the character service, getting a single
   * character trait. Routes to edit or create mode, depending on the existence of an id.
   */
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('characterId')) {
        this.mode = 'edit';
        this.characterId = paramMap.get('characterId');
        this.characterService.getCharacter(this.characterId).subscribe(characterData => {
          this.character = {id: characterData._id, title: characterData.title, detail: characterData.detail};
        });
      } else { this.mode = 'create'; this.characterId = null; }
    });
  }
  /**
   * Performs POST and PUT functions from the character service and resets
   * the form.
   * @param form of type NgForm.
   */
  onSaveCharacter(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.characterService.addCharacter(form.value.title, form.value.detail);
    } else {
      this.characterService.updateCharacter(this.characterId, form.value.title, form.value.detail);
    }
    form.resetForm();
  }

}
