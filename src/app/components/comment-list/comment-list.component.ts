import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from '../../shared/models/comment.model';
import { CommentService } from '../../shared/service/comment.service';
import { AuthServiceService } from '../user/auth-service.service';

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
   * comments property used to reference an array of comment data.
   */
  comments: Comment[] = [];

  /**
   * commentSub property with a type of Subscription from the rxjs library.
   * Unsubscribes in the ngOnDestroy function.
   */
  private commentSub: Subscription;
  userId: string;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  /**
   * @ignore
   */
  constructor(public commentService: CommentService, private authService: AuthServiceService) { }

  /**
   * This function performs a GET request from the CommentService for a list of comments from the database.
   */
  ngOnInit() {
    this.commentService.getComments();
    this.userId = this.authService.getUserId();
    this.commentSub = this.commentService.getCommentUpdateListener()
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }
  /**
   * Performs a delete function from the CommentService on a button click.
   * @param commentId of type string.
   */
  onDelete(commentId: string) {
    this.commentService.deleteComment(commentId);
  }

  /**
   * Performs an unsubscribe method when onDelete() is clicked.
   */
  ngOnDestroy() {
    this.commentSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
