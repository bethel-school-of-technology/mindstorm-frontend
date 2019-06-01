import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Comment } from '../models/comment.model';
import { environment } from '../../../environments/environment';

/**
 * This variable connects the frontend to the backend's api route.
 */
const backendURL = environment.apiURL + '/comments/';

/**
 * Comment service for comment-list and comment-post components.
 * See {@link Comment} for class model.
 */
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  /*** @property comments references an array of Comment data */
  private comments: Comment[] = [];

  /*** @property commentsUpdated references a new Subject and Comment array */
  private commentsUpdated = new Subject<Comment[]>();

  /** @ignore */
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * This function performs a GET method to retrieve a list of comments from the database.
   */
  getComments() {
    this.http.get<{ message: string; comments: any }>(backendURL)
      .pipe(map(commentData => {
        return commentData.comments.map(comment => {
          return {
            postTitle: comment.postTitle,
            postBody: comment.postBody,
            id: comment._id,
            creator: comment.creator
          };
        });
      }))
      .subscribe(formedComments => {
        this.comments = formedComments;
        this.commentsUpdated.next([...this.comments]);
      });
  }

  /**
   * This function returns the commentsUpdated property to update the list of comments.
   */
  getCommentUpdateListener() {
    return this.commentsUpdated.asObservable();
  }

  /**
   * This function performs an http DELETE method for deleting a comment by its id.
   * @param commentId string
   */
  deleteComment(commentId: string) {
    this.http.delete(backendURL + commentId)
      .subscribe(() => {
        const updatedComments = this.comments.filter(comment => comment.id !== commentId);
        this.comments = updatedComments;
        this.commentsUpdated.next([...this.comments]);
      });
  }

  /**
   * This function performs an http GET method to get a single comment by its id.
   * @param id string
   */
  getComment(id: string) {
    return this.http.get<{
      _id: string;
      postTitle: string;
      postBody: string;
      creator: string;
    }>(backendURL + id);
  }

  /**
   * This function performs an http POST method for creating a new comment.
   * @param postTitle string
   * @param postBody string
   * @param creator string
   */
  addComment(postTitle: string, postBody: string, creator: string) {
    const comment: Comment = { id: null, postTitle, postBody, creator };
    this.http.post<{ message: string; commentId: string }>(backendURL, comment)
      .subscribe(responseData => {
        const id = responseData.commentId;
        comment.id = id;
        this.comments.push(comment);
        this.commentsUpdated.next([...this.comments]);
        this.router.navigate(['/comments']);
      });
  }

  /**
   * This function performs an http PUT method for editing a comment by its id.
   * @param id string
   * @param postTitle string
   * @param postBody string
   * @param creator string
   */

  updateComment(id: string, postTitle: string, postBody: string, creator: string) {
    const comment: Comment = { id, postTitle, postBody, creator };
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
