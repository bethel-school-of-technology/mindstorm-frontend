import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from '../user/user.service';
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
  /*** @property characterTitle with empty string */
  title = '';

  /*** @property characterDetail with empty string */
  detail = '';

  /** Local reference of Character */
  character: Character;

  /*** @property mode routed to character/create */
  private mode = 'character/create';

  /*** @property characterId string */
  private characterId: string;

  /**
   * authStatusSub Subscription from rxjs library
   * and unsubscribes in the ngOnDestroy function.
   */
  private authStatusSub: Subscription;

  /*** @property isLoading reference to mat-spinner */
  isLoading = false;

  /** @ignore */
  constructor(
    public characterService: CharacterService,
    public route: ActivatedRoute,
    private userService: UserService
    ) { }

  /**
   * Performs a GET by id function from the CharacterService, getting a single
   * character trait. Routes to character/edit or character/create mode, depending on the existence of an id.
   */
  ngOnInit() {
    this.authStatusSub = this.userService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('characterId')) {
        this.mode = 'character/edit';
        this.characterId = paramMap.get('characterId');
        this.isLoading = true;
        this.characterService.getCharacter(this.characterId).subscribe(characterData => {
          this.isLoading = false;
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
   * @param form NgForm
   */
  onSaveCharacter(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'character/create') {
      this.characterService.addCharacter(form.value.title, form.value.detail, form.value);
    } else {
      this.characterService.updateCharacter(this.characterId, form.value.title, form.value.detail, form.value);
    }
    form.resetForm();
  }
}
