import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from '../../shared/comment.model';
import { CommentService } from '../../shared/comment.service';

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

  /**
   * @ignore
   */
  constructor(public commentService: CommentService) { }

  /**
   * This function performs a GET request from the CommentService for a list of comments from the database.
   */
  ngOnInit() {
    this.commentService.getComments();
    this.commentSub = this.commentService.getCommentUpdateListener()
    .subscribe((comments: Comment[]) => {
      this.comments = comments;
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
  }
}
