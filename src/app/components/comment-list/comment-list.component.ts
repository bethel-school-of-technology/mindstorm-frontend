import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from '../../shared/comment.model';
import { CommentService } from '../../shared/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy {

  comments: Comment[] = [];
  private commentSub: Subscription;

  constructor(public commentService: CommentService) { }

  ngOnInit() {
    this.commentService.getComments();
    this.commentSub = this.commentService.getCommentUpdateListener()
    .subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
  }
  onDelete(commentId: string) {
    this.commentService.deleteComment(commentId);
  }
  ngOnDestroy() {
    this.commentSub.unsubscribe();
  }
}
