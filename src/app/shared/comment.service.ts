import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Comment } from './comment.model';
import { environment } from '../../environments/environment';

const backendURL = environment.apiURL + '/comments/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Comment[] = [];
  private commentsUpdated = new Subject<Comment[]>();

  constructor(private http: HttpClient, private router: Router) { }

  // This will grab comments from database
  getComments() {
    this.http.get<{ message: string; comments: any }>(backendURL)
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
  deleteComment(commentId: string) {
    this.http.delete(backendURL + commentId)
      .subscribe(() => {
        const updatedComments = this.comments.filter(comment => comment.id !== commentId);
        this.comments = updatedComments;
        this.commentsUpdated.next([...this.comments]);
      });
  }
  // This will get comment by ID
  getComment(id: string) {
    return this.http.get<{
      _id: string;
      postTitle: string;
      postBody: string
    }>(backendURL + id);
  }
  // This will create comment
  addComment(postTitle: string, postBody: string) {
    const comment: Comment = { id: null, postTitle, postBody };
    this.http.post<{ message: string; commentId: string }>(backendURL, comment)
      .subscribe(responseData => {
        const id = responseData.commentId;
        comment.id = id;
        this.comments.push(comment);
        this.commentsUpdated.next([...this.comments]);
        this.router.navigate(['/comments']);
      });
  }
  // This will update comment
  updateComment(id: string, postTitle: string, postBody: string) {
    const comment: Comment = { id, postTitle, postBody };
    this.http.put(backendURL + id, comment)
      .subscribe(response => {
        const updatedComments = [...this.comments];
        const oldCommentIndex = updatedComments.findIndex(c => c.id === comment.id);
        updatedComments[oldCommentIndex] = comment;
        this.commentsUpdated.next([...this.comments]);
        this.router.navigate(['/comments']);
      });
  }
}
