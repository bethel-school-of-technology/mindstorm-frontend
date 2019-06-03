import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { UserService } from '../user/user.service';
import { CharacterService } from '../../shared/service/character.service';
import { Character } from '../../shared/models/character.model';

/**
 * Character-list component gets a list of character traits from the database.
 */
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit, OnDestroy {
  /*** @property characters references an array of character data*/
  characters: Character[] = [];

  /*** @property dialog title */
  title = 'confirmation-dialog';

  /*** @property userId string */
  userId: string;

  /*** Checks a user's authentication status. */
  userIsAuthenticated = false;


  /*** @property isLoading reference to mat-spinner */
  isLoading = false;

  /**
   * characterSub rxjs Subscription.
   * Unsubscribes in ngOnDestroy function.
   */
  private characterSub: Subscription;

  /*** @property authStatusSub rxjs Subscription */
  private authStatusSub: Subscription;

  /** @ignore */
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
    this.isLoading = true;
    this.characterService.getCharacters();
    this.userId = this.userService.getUserId();
    this.characterSub = this.characterService.getCharacterUpdateListener()
      .subscribe((characterData: { characters: Character[]; characterCount: number }) => {
        this.isLoading = false;
        this.characters = characterData.characters;
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
   * and performs the deleteCharacter method from {@link CharacterService}.
   * @param characterId string
   */
  openDialog(characterId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want this deleted?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.characterService.deleteCharacter(characterId);
        this.isLoading = false;
      }
    });
  }

  /**
   * Performs an unsubscribe method on characterSub and
   * authStatusSub properties when onDelete() is clicked.
   */
  ngOnDestroy() {
    this.characterSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
