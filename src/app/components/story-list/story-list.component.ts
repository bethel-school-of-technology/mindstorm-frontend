import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Story } from '../../shared/models/story.model';
import { StoryService } from '../../shared/service/story.service';
import { UserService } from '../user/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

/**
 * Story-list component gets a list of stories from the database.
 */
@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit, OnDestroy {
  /**
   * stories property used to reference an array of story data.
   */
  stories: Story[] = [];
  /**
   * storySub property with a type of Subscription from the rxjs library.
   * Unsubscribes in the ngOnDestroy function.
   */
  private storySub: Subscription;
  userId: string;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;
  title = 'confirmation-dialog';

  /**
   *  @ignore
   */
  constructor(
    public storyService: StoryService,
    private userService: UserService,
    public dialog: MatDialog
    ) { }

  /**
   * This function performs a GET request from the StoryService for a list of stories from the database.
   */
  ngOnInit() {
    this.storyService.getStories();
    this.userId = this.userService.getUserId();
    this.storySub = this.storyService.getStoryUpdateListener()
      .subscribe((storyData: { stories: Story[] }) => {
        this.stories = storyData.stories;
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
   * @param storyId string
   */
  openDialog(storyId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want this deleted?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.storyService.deleteStory(storyId);
      }
    });
  }

  /**
   * Performs an unsubscribe method when onDelete() is clicked.
   */
  ngOnDestroy() {
    this.storySub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
