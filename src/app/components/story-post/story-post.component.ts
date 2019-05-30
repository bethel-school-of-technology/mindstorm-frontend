import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Story } from '../../shared/models/story.model';
import { StoryService } from '../../shared/service/story.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
  private mode = 'story/create';
  /**
   * storyId property with type string.
   */
  private storyId: string;
  title = 'confirmation-dialog';

  /**
   * @ignore
   */
  constructor(
    public storyService: StoryService,
    public route: ActivatedRoute,
    public dialog: MatDialog
    ) { }

  /**
   * Performs a GET by id function from the StoryService, getting a single
   * story. Routes to editStory or createStory mode, depending on the existence of an id.
   */
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('storyId')) {
        this.mode = 'story/edit';
        this.storyId = paramMap.get('storyId');
        this.storyService.getStory(this.storyId).subscribe(storyData => {
          this.story = {
            id: storyData._id,
            storyTitle: storyData.storyTitle,
            storyBody: storyData.storyBody,
            creator: storyData.creator
          };
        });
      } else { this.mode = 'story/create'; this.storyId = null; }
    });
  }

  /**
   * Performs POST and PUT functions from the StoryService and resets the form.
   * @param form NgForm.
   */
  onSaveStory(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'story/create') {
      this.storyService.addStory(form.value.storyTitle, form.value.storyBody, form.value);
    } else {
      this.storyService.updateStory(this.storyId, form.value.storyTitle, form.value.storyBody, form.value);
    }
    form.resetForm();
  }

}

