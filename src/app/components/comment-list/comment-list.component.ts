import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { UserService } from '../user/user.service';
import { CommentService } from '../../shared/service/comment.service';
import { Comment } from '../../shared/models/comment.model';

/**
 * Comment-list component gets a list of comments from the database.
 */
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy {

  /*** @property comments references an array of comment data */
  comments: Comment[] = [];
  /*** @property dialog title */
  title = 'confirmation-dialog';
  /*** @property userId string */
  userId: string;
  /*** Checks a user's authentication status. */
  userIsAuthenticated = false;
  /*** @property isLoading reference to mat-spinner */
  isLoading = false;
  /**
   * commentSub Subscription from the rxjs library.
   * Unsubscribes in the ngOnDestroy function.
   */
  private commentSub: Subscription;
  /*** @property authStatusSub rxjs Subscription */
  private authStatusSub: Subscription;

  /** @ignore */
  constructor(
    public commentService: CommentService,
    private userService: UserService,
    public dialog: MatDialog
    ) { }

  /**
   * This function performs a GET request from the CommentService for a list of comments from the database.
   */
  ngOnInit() {
    this.isLoading = true;
    this.commentService.getComments();
    this.userId = this.userService.getUserId();
    this.commentSub = this.commentService.getCommentUpdateListener()
      .subscribe((comments: Comment[]) => {
        this.isLoading = false;
        this.comments = comments;
      });
    this.userIsAuthenticated = this.userService.getIsAuth();
    this.authStatusSub = this.userService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.userService.getUserId();
      });
  }
  /**
   * Opens a dialog popup when the delete button is clicked
   * @param commentId string
   */
  openDialog(commentId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want this deleted?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.commentService.deleteComment(commentId);
        this.isLoading = false;
      }
    });
  }

  /**
   * Performs an unsubscribe method when onDelete() is clicked.
   */
  ngOnDestroy() {
    this.commentSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
