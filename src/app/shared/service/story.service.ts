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
  private storiesUpdated = new Subject<{ stories: Story[]; storyCount: number }>();

  /**
   * @ignore
   */
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * This function performs a GET method to get a list of stories from the database.
   */
  getStories(storiesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${storiesPerPage}&page=${currentPage}`;
    this.http
    .get<{ message: string; stories: any; maxStories: number }>
    (backendURL + queryParams)
      .pipe(map(storyData => {
        return {
          stories: storyData.stories.map(story => {
            return {
              storyTitle: story.storyTitle,
              storyBody: story.storyBody,
              id: story._id,
              creator: story.creator
            };
          }),
          maxStories: storyData.maxStories
        };
      })
    )
    .subscribe(transformedStoryData => {
      this.stories = transformedStoryData.stories;
      this.storiesUpdated.next({
        stories: [...this.stories],
        storyCount: transformedStoryData.maxStories
      });
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
   * @param storyId string.
   */
  deleteStory(storyId: string) {
    return this.http.delete(backendURL + storyId);
      // .subscribe(() => {
      //   const updatedStories = this.stories.filter(story => story.id !== storyId);
      //   this.stories = updatedStories;
      //   this.storiesUpdated.next({ stories: [...this.stories] });
      // });
  }

  /**
   * This function performs an http GET method to get a single story by its id.
   * @param id string.
   */
  getStory(id: string) {
    return this.http.get<{
      _id: string;
      storyTitle: string;
      storyBody: string;
      creator: string;
    }>(backendURL + id);
  }

  /**
   * This function performs an http POST method for creating a new story.
   * @param storyTitle string.
   * @param storyBody string.
   */
  addStory(storyTitle: string, storyBody: string, creator: string) {
    const storyData: Story = { id: null, storyTitle, storyBody, creator };
    this.http.post<{ message: string; storyId: string }>(backendURL, storyData)
      .subscribe(responseData => {
        // const id = responseData.storyId;
        // storyData.id = id;
        // this.stories.push(storyData);
        // this.storiesUpdated.next({
        //   stories: [...this.stories],
        // });
        this.router.navigate(['/']);
      });
  }

  // addStory(storyTitle: string, storyBody: string) {
  //   const storyData = new FormData();
  //   storyData.append('storyTitle', storyTitle);
  //   storyData.append('storyBody', storyBody);
  //   this.http
  //     .post<{ message: string; story: Story }>(backendURL, storyData)
  //     .subscribe(responseData => {
  //       this.router.navigate(['/']);
  //     });
  // }

  updateStory(id: string, storyTitle: string, storyBody: string) {
    let storyData: Story;
    storyData = {
        id,
        storyTitle,
        storyBody,
        creator: null
      };
    this.http.put(backendURL + id, storyData)
    .subscribe(response => {
      this.router.navigate(['/']);
    });
  }

  /**
   * This function performs an http PUT method for editing a story by its id.
   * @param id string.
   * @param storyTitle string.
   * @param storyBody string.
   */
  // updateStory(id: string, storyTitle: string, storyBody: string, creator: string) {
  //   const story: Story = { id, storyTitle, storyBody, creator };
  //   this.http.put(backendURL + id, story)
  //     .subscribe(response => {
  // const updatedStories = [...this.stories];
  // const oldStoriesIndex = updatedStories.findIndex(s => s.id === story.id);
  // updatedStories[oldStoriesIndex] = story;
  // this.storiesUpdated.next({
  //   stories: [...this.stories]
  // });
  //       this.router.navigate(['/']);
  //     });
  // }
}
