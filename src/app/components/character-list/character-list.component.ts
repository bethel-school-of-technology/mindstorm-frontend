import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Character } from '../../shared/models/character.model';
import { CharacterService } from '../../shared/service/character.service';
import { UserService } from '../user/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
   * @property characters used to reference an array of character data.
   */
  characters: Character[] = [];
  /**
   * @property characterSub rxjs Subscription
   * Unsubscribes in ngOnDestroy function.
   */
  private characterSub: Subscription;
  /**
   * @property userId string
   */
  userId: string;
  /**
   * Checks a user's authentication status.
   */
  userIsAuthenticated = false;
  /**
   * @property authStatusSub rxjs Subscription
   */
  private authStatusSub: Subscription;
  title = 'confirmation-dialog';

  /**
   *  @ignore
   */
  constructor(
    public characterService: CharacterService,
    private userService: UserService,
    public dialog: MatDialog
    ) { }

  /**
   * ngOnInit function performs a GET request for list of character traits
   * from the database.
   */
  ngOnInit() {
    this.characterService.getCharacters();
    this.userId = this.userService.getUserId();
    this.characterSub = this.characterService.getCharacterUpdateListener()
      .subscribe((characters: Character[]) => {
        this.characters = characters;
      });
    this.userIsAuthenticated = this.userService.getIsAuth();
    this.authStatusSub = this.userService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.userService.getUserId();
      });
  }

  /**
   * Opens a dialog popup when the delete button is clicked
   * @param characterId string
   */
  openDialog(characterId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want this deleted?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.characterService.deleteCharacter(characterId);
      }
    });
  }

  /**
   * Performs an unsubscribe method when onDelete() is clicked.
   */
  ngOnDestroy() {
    this.characterSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
