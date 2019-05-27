import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Story } from '../../shared/story.model';
import { StoryService } from '../../shared/story.service';
import { AuthServiceService } from '../user/auth-service.service';

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


  /**
   *  @ignore
   */
  constructor(
    public storyService: StoryService,
    private authService: AuthServiceService
    ) { }

  /**
   * This function performs a GET request from the StoryService for a list of stories from the database.
   */
  ngOnInit() {
    this.storyService.getStories();
    this.userId = this.authService.getUserId();
    this.storySub = this.storyService.getStoryUpdateListener()
      .subscribe((stories: Story[]) => {
        this.stories = stories;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  /**
   * Performs a delete function from the StoryService on a button click.
   * @param storyId of type string.
   */
  onDelete(storyId: string) {
    this.storyService.deleteStory(storyId);
  }

  /**
   * Performs an unsubscribe method when onDelete() is clicked.
   */
  ngOnDestroy() {
    this.storySub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
