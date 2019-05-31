import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from '../../shared/models/comment.model';
import { CommentService } from '../../shared/service/comment.service';
import { UserService } from '../user/user.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

/**
 * Comment-list component gets a list of comments from the database.
 */
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy {
  /**
   * @property comments property used to reference an array of comment data.
   */
  comments: Comment[] = [];
  /**
   * @property commentSub property with a type of Subscription from the rxjs library.
   * Unsubscribes in the ngOnDestroy function.
   */
  private commentSub: Subscription;
  /**
   * @property userId string
   */
  userId: string;
   /**
   * Checks a user's authentication status.
   */
  userIsAuthenticated = false;
  /**
   * @property authStatusSub rxjs Subscription
   */
  private authStatusSub: Subscription;
  title = 'confirmation-dialog';

  /**
   * @ignore
   */
  constructor(
    public commentService: CommentService,
    private userService: UserService,
    public dialog: MatDialog
    ) { }

  /**
   * This function performs a GET request from the CommentService for a list of comments from the database.
   */
  ngOnInit() {
    this.commentService.getComments();
    this.userId = this.userService.getUserId();
    this.commentSub = this.commentService.getCommentUpdateListener()
      .subscribe((comments: Comment[]) => {
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
        this.commentService.deleteComment(commentId);
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
