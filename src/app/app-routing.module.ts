import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterPostComponent } from './components/character-post/character-post.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { StoryPostComponent } from './components/story-post/story-post.component';


const routes: Routes = [
  {
    path: '',
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
    path: 'edit/:storyId',
    component: StoryPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
