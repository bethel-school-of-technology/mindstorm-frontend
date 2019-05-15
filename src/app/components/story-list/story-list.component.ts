import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Story } from '../../shared/story.model';
import { StoryService } from '../../shared/story.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit, OnDestroy {

  stories: Story[] = [];
  private storySub: Subscription;

  constructor(public storyService: StoryService) { }

  ngOnInit() {
    this.storyService.getStories();
    this.storySub = this.storyService.getStoryUpdateListener()
      .subscribe((stories: Story[]) => {
        this.stories = stories;
      });
  }
  onDelete(storyId: string) {
    this.storyService.deleteStory(storyId);
  }

  ngOnDestroy() {
    this.storySub.unsubscribe();
  }
}
