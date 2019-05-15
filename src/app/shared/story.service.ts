import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Story } from './story.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private stories: Story[] = [];
  private storiesUpdated = new Subject<Story[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getStories() {
    this.http.get<{ message: string; stories: any }>('http://localhost:3000/api/stories')
      .pipe(map(storyData => {
        return storyData.stories.map(story => {
          return {
            storyTitle: story.storytitle,
            storyBody: story.storybody,
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
    this.http.delete('http://localhost:3000/api/stories/' + storyId)
      .subscribe(() => {
        const updatedStories = this.stories.filter(story => story.id !== storyId);
        this.stories = updatedStories;
        this.storiesUpdated.next([...this.stories]);
      });
  }
}