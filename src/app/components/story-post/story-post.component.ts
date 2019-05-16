import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Story } from '../../shared/story.model';
import { StoryService } from '../../shared/story.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-story-post',
  templateUrl: './story-post.component.html',
  styleUrls: ['./story-post.component.css']
})
export class StoryPostComponent implements OnInit {
  storyTitle = '';
  storyBody = '';
  story: Story;
  private mode = 'createStory';
  private storyId: string;

  constructor(public storyService: StoryService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('storyId')) {
        this.mode = 'edit';
        this.storyId = paramMap.get('storyId');
        this.storyService.getStory(this.storyId).subscribe(storyData => {
          this.story = {id: storyData._id, storyTitle: storyData.storyTitle, storyBody: storyData.storyBody};
        });
      } else { this.mode = 'createStory'; this.storyId = null; }
    });
  }

  onSaveStory(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'createStory') {
      this.storyService.addStory(form.value.storyTitle, form.value.storyBody);
    } else {
      this.storyService.updateStory(this.storyId, form.value.storyTitle, form.value.storyBody);
    }
    form.resetForm();
  }
}

