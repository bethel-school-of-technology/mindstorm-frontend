import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { UserService } from '../../shared/service/user.service';
import { CommentService } from '../../shared/service/comment.service';
import { Comment } from '../../shared/models/comment.model';

/**
 * Comment-post component uses an html form to GET by id, POST, and PUT comments to the database.
 */
@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})
export class CommentPostComponent implements OnInit {
  /** postTitle empty string */
  postTitle = '';

  /** postBody empty string */
  postBody = '';

  /** Local reference of Comment */
  comment: Comment;

  /** mode set to comment/create route */
  private mode = 'comment/create';

  /** commentId string */
  private commentId: string;

  /**
   * authStatusSub rxjs Subscription.
   * Unsubscribes in the ngOnDestroy function.
   */
  private authStatusSub: Subscription;

  /** isLoading reference to mat-spinner */
  isLoading = false;

  /*** @property dialog title */
  title = 'confirmation-dialog';

  /** @ignore */
  constructor(
    public commentService: CommentService,
    public route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  /**
   * Performs a GET by id function from the CommentService, getting a single
   * comment. Routes to comment/edit or comment/create mode, depending on the existence of an id.
   */
  ngOnInit() {
    this.authStatusSub = this.userService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('commentId')) {
        this.mode = 'comment/edit';
        this.commentId = paramMap.get('commentId');
        this.isLoading = true;
        this.commentService
          .getComment(this.commentId)
          .subscribe(commentData => {
            this.isLoading = false;
            this.comment = {
              id: commentData._id,
              postTitle: commentData.postTitle,
              postBody: commentData.postBody,
              creator: commentData.creator
            };
          });
      } else {
        this.mode = 'comment/create';
        this.commentId = null;
      }
    });
  }

  /**
   * Opens a dialog popup for user comfirmation of the creation or edit of a comment.
   * Performs POST and PUT functions from the CommentService and resets the form.
   * @param form NgForm
   */
  openDialog(form: NgForm) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Your changes will be public. Are you sure?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (form.invalid) {
          return;
        }
        this.isLoading = true;
        if (this.mode === 'comment/create') {
          this.commentService.addComment(
            form.value.postTitle,
            form.value.postBody,
            form.value
          );
        } else {
          this.commentService.updateComment(
            this.commentId,
            form.value.postTitle,
            form.value.postBody,
            form.value
          );
        }
        form.resetForm();
      }
    });
  }
}
