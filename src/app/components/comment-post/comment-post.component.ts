import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { CommentService } from '../../shared/comment.service';
import { Comment } from '../../shared/comment.model';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})
export class CommentPostComponent implements OnInit {
  commentTitle = '';
  commentBody = '';
  comment: Comment;
  private mode = 'createComment';
  private commentId: string;

  constructor(public commentService: CommentService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('commentId')) {
        this.mode = 'editComment';
        this.commentId = paramMap.get('commentId');
        this.commentService.getComment(this.commentId).subscribe(commentData => {
          this.comment = {id: commentData._id, title: commentData.title, detail: commentData.detail};
        });
      } else { this.mode = 'createComment'; this.commentId = null; }
    });
  }
  onSaveComment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'createComment') {
      this.commentService.addComment(form.value.title, form.value.detail);
    } else {
      this.commentService.updateComment(this.commentId, form.value.title, form.value.detail);
    }
    form.resetForm();
  }
}
