import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Story } from '../../shared/story.model';
import { StoryService } from '../../shared/story.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

/**
 * Story-post component uses an html form to GET by id, POST, and PUT character
 * traits to the database.
 */
@Component({
  selector: 'app-story-post',
  templateUrl: './story-post.component.html',
  styleUrls: ['./story-post.component.css']
})
export class StoryPostComponent implements OnInit {
  /**
   * storyTitle property with a type of empty string.
   */
  storyTitle = '';
  /**
   * storyBody property with a type of empty string.
   */
  storyBody = '';
  /**
   * Local reference of Story.
   */
  story: Story;
  /**
   * mode property set to createStory route.
   */
  private mode = 'createStory';
  /**
   * storyId property with type string.
   */
  private storyId: string;

  /**
   * @ignore
   */
  constructor(public storyService: StoryService, public route: ActivatedRoute) { }

  /**
   * Performs a GET by id function from the StoryService, getting a single
   * story. Routes to editStory or createStory mode, depending on the existence of an id.
   */
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('storyId')) {
        this.mode = 'editStory';
        this.storyId = paramMap.get('storyId');
        this.storyService.getStory(this.storyId).subscribe(storyData => {
          this.story = {id: storyData._id, storyTitle: storyData.storyTitle, storyBody: storyData.storyBody};
        });
      } else { this.mode = 'createStory'; this.storyId = null; }
    });
  }

  /**
   * Performs POST and PUT functions from the StoryService and resets the form.
   * @param form of type NgForm.
   */
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

