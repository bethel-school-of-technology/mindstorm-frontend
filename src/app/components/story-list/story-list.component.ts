import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, PageEvent } from '@angular/material';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { UserService } from '../user/user.service';
import { StoryService } from '../../shared/service/story.service';
import { Story } from '../../shared/models/story.model';

/**
 * Story-list component gets a list of stories from the database.
 */
@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit, OnDestroy {

  /** stories references an array of story data. */
  stories: Story[] = [];

  /** totalStories set to an initial 0 */
  totalStories = 0;

  /** storiesPerPage set to initial 5 stories per page */
  storiesPerPage = 5;

  /** currentPage set to 1 page */
  currentPage = 1;

  /** pageSizeOptions set to pagination number sizes */
  pageSizeOptions = [1, 2, 5, 10];

  /** Dialog title */
  title = 'confirmation-dialog';

  /** Checks user authorization */
  userIsAuthenticated = false;

  /** userId string */
  userId: string;

  /** isLoading reference to mat-spinner */
  isLoading = false;

  /**
   * storySub rxjs Subscription.
   * Unsubscribes in the ngOnDestroy function.
   */
  private storySub: Subscription;

  /*** @property authStatusSub Subscription rxjs library */
  private authStatusSub: Subscription;

  /*** @ignore */
  constructor(
    public storyService: StoryService,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  /**
   * Performs a GET request from StoryService for a list of stories from the database.
   */
  ngOnInit() {
    this.isLoading = true;
    this.storyService.getStories(this.storiesPerPage, this.currentPage);
    this.userId = this.userService.getUserId();
    this.storySub = this.storyService.getStoryUpdateListener()
      .subscribe((storyData: { stories: Story[]; storyCount: number }) => {
        this.isLoading = false;
        this.totalStories = storyData.storyCount;
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
   * Performs pagination by controlling stories per page, page size, and current page.
   * @param pageData PageEvent
   */
  onPageChanged(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.storiesPerPage = pageData.pageSize;
    this.storyService.getStories(this.storiesPerPage, this.currentPage);
  }

  /**
   * Opens a dialog popup when the delete button is clicked
   * and performs the deleteStory method from {@link StoryService}.
   * @param storyId string
   */
  openDialog(storyId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want this deleted?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.storyService.deleteStory(storyId).subscribe(() => {
          this.storyService.getStories(this.storiesPerPage, this.currentPage);
        },
          () => {
            this.isLoading = false;
          });
      }
    });
  }

  /**
   *  Performs an unsubscribe method on storySub and
   * authStatusSub properties when onDelete() is clicked.
   */
  ngOnDestroy() {
    this.storySub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
