import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterPostComponent } from './components/character-post/character-post.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { StoryPostComponent } from './components/story-post/story-post.component';
import { StoryListComponent } from './components/story-list/story-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentPostComponent } from './components/comment-post/comment-post.component';
import { LoginComponent } from './components/user/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: StoryListComponent
  },
  {
    path: 'characters',
    component: CharacterListComponent,
  },
  {
    path: 'create',
    component: CharacterPostComponent,
  },
  {
    path: 'edit/:characterId',
    component: CharacterPostComponent
  },
  {
    path: 'createStory',
    component: StoryPostComponent,
  },
  {
    path: 'editStory/:storyId',
    component: StoryPostComponent
  },
  {
    path: 'comments',
    component: CommentListComponent
  },
  {
    path: 'createComment',
    component: CommentPostComponent
  },
  {
    path: 'editComment/:commentId',
    component: CommentPostComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
