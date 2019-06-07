import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Story } from '../models/story.model';
import { environment } from '../../../environments/environment';

/**
 * This variable connects the frontend to the backend's api route
 * and is stored in the environment folder.
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
  /** stories used to reference an array of Story data */
  private stories: Story[] = [];

  /** storiesUpdated used to reference a new Subject and Story array */
  private storiesUpdated = new Subject<{ stories: Story[]; storyCount: number }>();

  /** @ignore */
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Performs a GET method to retrieve a list of stories from the database.
   * Also performs query params for paginaton.
   */
  getStories(storiesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${storiesPerPage}&page=${currentPage}`;
    this.http
    .get<{ message: string; stories: any; maxStories: number }>(backendURL + queryParams)
      .pipe(map(storyData => {
        return {
          stories: storyData.stories.map(story => {
            return {
              storyTitle: story.storyTitle,
              storyBody: story.storyBody,
              id: story._id,
              imagePath: story.imagePath,
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

  /** Returns the storiesUpdated property to update the list of stories. */
  getStoryUpdateListener() {
   return this.storiesUpdated.asObservable();
  }

  /**
   * Performs a DELETE method for deleting a story by its id.
   * @param storyId string.
   */
  deleteStory(storyId: string) {
    return this.http.delete(backendURL + storyId);
  }

  /**
   * Performs a GET method to get a story by its id.
   * @param id string.
   */
  getStory(id: string) {
    return this.http.get<{
      _id: string;
      storyTitle: string;
      storyBody: string;
      imagePath: string;
      creator: string;
    }>(backendURL + id);
  }

  /**
   * This function performs a POST method for creating a story.
   * @param storyTitle string.
   * @param storyBody string.
   * @param image File
   */
  addStory(storyTitle: string, storyBody: string, image: File) {
    const storyData = new FormData();
    storyData.append('storyTitle', storyTitle);
    storyData.append('storyBody', storyBody);
    storyData.append('image', image, storyTitle);
    this.http.post<{ message: string; story: Story }>(backendURL, storyData)
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  /**
   * Performs a PUT method for editing a story by its id based
   * on whether the image's type is an 'object' or not.
   * @param id string
   * @param storyTitle string
   * @param storyBody string
   * @param image File | string
   */
  updateStory(id: string, storyTitle: string, storyBody: string, image: File | string) {
    let storyData: Story | FormData;
    if (typeof image === 'object') {
      storyData = new FormData();
      storyData.append('id', id);
      storyData.append('storyTitle', storyTitle);
      storyData.append('storyBody', storyBody);
      storyData.append('image', image, storyTitle);
    } else {
      storyData = {
          id,
          storyTitle,
          storyBody,
          imagePath: image,
          creator: null
        };
    }
    this.http.put(backendURL + id, storyData)
    .subscribe(response => {
      this.router.navigate(['/']);
    });
  }
}
