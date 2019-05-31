import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { UserService } from '../user/user.service';
import { StoryService } from '../../shared/service/story.service';
import { Story } from '../../shared/models/story.model';

/**
 * Story-post component uses an html form to GET by id, POST, and PUT character
 * traits to the database.
 */
@Component({
  selector: 'app-story-post',
  templateUrl: './story-post.component.html',
  styleUrls: ['./story-post.component.css']
})
export class StoryPostComponent implements OnInit, OnDestroy {
  /*** @property storyTitle of empty string */
  storyTitle = '';
  /*** @property storyBody of empty string */
  storyBody = '';
  /*** Local reference of Story */
  story: Story;
  /*** @property mode set to the story/create route */
  private mode = 'story/create';
  /*** @property storyId string */
  private storyId: string;
  /*** @property FormGroup */
  form: FormGroup;
  /**
   * authStatusSub Subscription from rxjs library
   * and unsubscribes in the ngOnDestroy function.
   */
  private authStatusSub: Subscription;
  /*** @property isLoading reference to mat-spinner */
  isLoading = false;
  /*** @property dialog title */
  title = 'confirmation-dialog';

  /*** @ignore*/
  constructor(
    public storyService: StoryService,
    private userService: UserService,
    public route: ActivatedRoute,
    public dialog: MatDialog
    ) { }

  /**
   * Performs a GET by id function from the StoryService, getting a single
   * story. Routes to editStory or createStory mode, depending on the existence of an id.
   */
  // ngOnInit() {
  //   this.authStatusSub = this.userService
  //     .getAuthStatusListener()
  //     .subscribe(userStatus => {
  //       this.isLoading = false;
  //     });
  //   this.route.paramMap.subscribe((paramMap: ParamMap) => {
  //     if (paramMap.has('storyId')) {
  //       this.mode = 'story/edit';
  //       this.storyId = paramMap.get('storyId');
  //       this.isLoading = true;
  //       this.storyService.getStory(this.storyId).subscribe(storyData => {
  //         this.isLoading = false;
  //         this.story = {
  //           id: storyData._id,
  //           storyTitle: storyData.storyTitle,
  //           storyBody: storyData.storyBody,
  //           creator: storyData.creator
  //         };
  //       });
  //     } else { this.mode = 'story/create'; this.storyId = null; }
  //   });
  // }

  /**
   * Performs a GET by id function from the StoryService, getting a single
   * story. Routes to story/edit or story/create mode, depending on the existence of an id.
   */
    ngOnInit() {
      this.authStatusSub = this.userService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
      this.form = new FormGroup({
        storyTitle: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        storyBody: new FormControl(
          null, {
            validators: [Validators.required]
          })
      });
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('storyId')) {
          this.mode = 'story/edit';
          this.storyId = paramMap.get('storyId');
          this.isLoading = true;
          this.storyService.getStory(this.storyId).subscribe(storyData => {
            this.isLoading = false;
            this.story = {
              id: storyData._id,
              storyTitle: storyData.storyTitle,
              storyBody: storyData.storyBody,
              creator: storyData.creator
            };
            this.form.setValue({
              storyTitle: this.story.storyTitle,
              storyBody: this.story.storyBody,
            });
          });
        } else {
          this.mode = 'story/create';
          this.storyId = null;
        }
      });
    }

  /** Performs POST and PUT functions from the StoryService and resets the form. */
  // onSaveStory() {
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   this.isLoading = true;
  //   if (this.mode === 'story/create') {
  //     this.storyService.addStory(
  //       this.form.value.storyTitle,
  //       this.form.value.storyBody,
  //       this.form.value.creator
  //     );
  //   } else {
  //     this.storyService.updateStory(
  //       this.storyId,
  //       this.form.value.storyTitle,
  //       this.form.value.storyBody
  //     );
  //   }
  //   this.form.reset();
  // }

  /** Opens a dialog popup when the "Save Your Story" button is clicked. */
  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Your changes will be public. Are you sure?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.form.invalid) {
          return;
        }
        this.isLoading = true;
        if (this.mode === 'story/create') {
          this.storyService.addStory(
            this.form.value.storyTitle,
            this.form.value.storyBody,
            this.form.value.creator
          );
        } else {
          this.storyService.updateStory(
            this.storyId,
            this.form.value.storyTitle,
            this.form.value.storyBody
          );
        }
        this.form.reset();
        }
    });
  }

  /**
   * Performs POST and PUT functions from the StoryService and resets the form.
   * @param form NgForm.
   */
  // onSaveStory(form: NgForm) {
  //   if (form.invalid) {
  //     return;
  //   }
  //   if (this.mode === 'story/create') {
  //     this.storyService.addStory(form.value.storyTitle, form.value.storyBody, form.value);
  //   } else {
  //     this.storyService.updateStory(this.storyId, form.value.storyTitle, form.value.storyBody, form.value);
  //   }
  //   form.resetForm();
  // }

  /** Performs an unsubscription on authStatusSub */
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}

