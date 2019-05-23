import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { CommentService } from '../../shared/comment.service';
import { Comment } from '../../shared/comment.model';

/**
 * Comment-post component uses an html form to GET by id, POST, and PUT comments to the database.
 */
@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})
export class CommentPostComponent implements OnInit {
  /**
   * postTitle property with a type of empty string.
   */
  postTitle = '';
  /**
   * postBody property with a type of empty string.
   */
  postBody = '';
  /**
   * Local reference of Comment.
   */
  comment: Comment;
  /**
   * mode property set to createComment route.
   */
  private mode = 'createComment';
  /**
   * commentId property of type string.
   */
  private commentId: string;

  /**
   * @ignore
   */
  constructor(public commentService: CommentService, public route: ActivatedRoute) { }

  /**
   * Performs a GET by id function from the CommentService, getting a single
   * comment. Routes to editComment or createComment mode, depending on the existence of an id.
   */
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('commentId')) {
        this.mode = 'editComment';
        this.commentId = paramMap.get('commentId');
        this.commentService.getComment(this.commentId).subscribe(commentData => {
          this.comment = {id: commentData._id, postTitle: commentData.postTitle, postBody: commentData.postBody};
        });
      } else { this.mode = 'createComment'; this.commentId = null; }
    });
  }

  /**
   * Performs POST and PUT functions from the CommentService and resets the form.
   * @param form of type NgForm.
   */
  onSaveComment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'createComment') {
      this.commentService.addComment(form.value.postTitle, form.value.postBody);
    } else {
      this.commentService.updateComment(this.commentId, form.value.postTitle, form.value.postBody);
    }
    form.resetForm();
  }
}
