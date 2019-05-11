import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { CharacterService } from '../../shared/character.service';
import { Character } from '../../shared/character.model';


@Component({
  selector: 'app-character-post',
  templateUrl: './character-post.component.html',
  styleUrls: ['./character-post.component.css']
})
export class CharacterPostComponent implements OnInit {
  characterTitle = '';
  characterDetail = '';
  character: Character;
  private mode = 'create';
  private characterId: string;

  constructor(public characterService: CharacterService, public route: ActivatedRoute) { }

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
