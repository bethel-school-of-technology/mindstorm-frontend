import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Story } from './story.model';
import { environment } from '../../environments/environment';

const backendURL = environment.apiURL + '/stories/';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private stories: Story[] = [];
  private storiesUpdated = new Subject<Story[]>();

  constructor(private http: HttpClient, private router: Router) { }

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

  getStoryUpdateListener() {
    return this.storiesUpdated.asObservable();
  }
  deleteStory(storyId: string) {
    this.http.delete(backendURL + storyId)
      .subscribe(() => {
        const updatedStories = this.stories.filter(story => story.id !== storyId);
        this.stories = updatedStories;
        this.storiesUpdated.next([...this.stories]);
      });
  }

  getStory(id: string) {
    return this.http.get<{
      _id: string;
      storyTitle: string;
      storyBody: string;
    }>(backendURL + id);
  }

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
