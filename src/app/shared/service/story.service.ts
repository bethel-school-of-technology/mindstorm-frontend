import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Story } from '../models/story.model';
import { environment } from '../../../environments/environment';

/**
 * This variable connects the frontend to the backend's api route.
 */
const backendURL = environment.apiURL + '/stories/';

/**
 * Story service for story-list and story-post components.
 * See {@link Story} for class model.
 */
@Injectable({
  providedIn: 'root'
})
export class StoryService {
  /**
   * stories property used to reference an array of Story data.
   */
  private stories: Story[] = [];
  /**
   * storiesUpdated property used to reference a new Subject and Story array.
   */
  private storiesUpdated = new Subject<Story[]>();

  /**
   * @ignore
   */
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * This function performs a GET method to get a list of stories from the database.
   */
  getStories() {
    this.http.get<{ message: string; stories: any }>(backendURL)
      .pipe(map(storyData => {
        return storyData.stories.map(story => {
          return {
            storyTitle: story.storyTitle,
            storyBody: story.storyBody,
            id: story._id
          };
        });
      }))
      .subscribe(formedStories => {
        this.stories = formedStories;
        this.storiesUpdated.next([...this.stories]);
      });
  }

  /**
   * This function returns the storiesUpdated property to update the list of stories.
   */
  getStoryUpdateListener() {
    return this.storiesUpdated.asObservable();
  }

  /**
   * This function performs an http DELETE method for deleting a story by its id.
   * @param storyId of type string.
   */
  deleteStory(storyId: string) {
    this.http.delete(backendURL + storyId)
      .subscribe(() => {
        const updatedStories = this.stories.filter(story => story.id !== storyId);
        this.stories = updatedStories;
        this.storiesUpdated.next([...this.stories]);
      });
  }

  /**
   * This function performs an http GET method to get a single story by its id.
   * @param id of type string.
   */
  getStory(id: string) {
    return this.http.get<{
      _id: string;
      storyTitle: string;
      storyBody: string;
    }>(backendURL + id);
  }

  /**
   * This function performs an http POST method for creating a new story.
   * @param storyTitle of type string.
   * @param storyBody of type string.
   */
  addStory(storyTitle: string, storyBody: string) {
    const story: Story = { id: null, storyTitle, storyBody };
    this.http.post<{ message: string; storyId: string }>(backendURL, story)
      .subscribe(responseData => {
        const id = responseData.storyId;
        story.id = id;
        this.stories.push(story);
        this.storiesUpdated.next([...this.stories]);
        this.router.navigate(['/']);
      });
  }

  /**
   * This function performs an http PUT method for editing a story by its id.
   * @param id of type string.
   * @param storyTitle of type string.
   * @param storyBody of type string.
   */
  updateStory(id: string, storyTitle: string, storyBody: string) {
    const story: Story = { id, storyTitle, storyBody };
    this.http.put(backendURL + id, story)
      .subscribe(response => {
        const updatedStories = [...this.stories];
        const oldStoriesIndex = updatedStories.findIndex(s => s.id === story.id);
        updatedStories[oldStoriesIndex] = story;
        this.storiesUpdated.next([...this.stories]);
        this.router.navigate(['/']);
      });
  }
}