import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Comment } from './comment.model';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Comment[] = [];
  private commentsUpdated = new Subject<Comment[]>();

  constructor(private http: HttpClient, private router: Router) { }
// This will grab comments from database
  getComments() {
    this.http.get<{ message: string; comments: any }>('http://localhost:3000/api/comments')
    .pipe(map(commentData => {
      return commentData.comments.map(comment => {
        return {
          postTitle: comment.postTitle,
          postBody: comment.postBody,
          id: comment._id
        };
      });
    }))
    .subscribe(formedComments => {
      this.comments = formedComments;
      this.commentsUpdated.next([...this.comments]);
    });
  }
// This will get Comments and return them to be seen on webpage
  getCommentUpdateListener() {
    return this.commentsUpdated.asObservable();
  }
// This will delete comments from the webpage and database
  deleteComment(commentId: string)  {
    this.http.delete('http://localhost:3000/api/comments' + commentId)
    .subscribe(() => {
      const updatedComments = this.comments.filter(comment => comment.id !== commentId);
      this.comments = updatedComments;
      this.commentsUpdated.next([...this.comments]);
    });
  }

}
