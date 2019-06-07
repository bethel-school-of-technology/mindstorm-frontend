import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CharacterPostComponent } from "./components/character-post/character-post.component";
import { CharacterListComponent } from "./components/character-list/character-list.component";
import { StoryPostComponent } from "./components/story-post/story-post.component";
import { StoryListComponent } from "./components/story-list/story-list.component";
import { CommentListComponent } from "./components/comment-list/comment-list.component";
import { CommentPostComponent } from "./components/comment-post/comment-post.component";
import { LoginComponent } from "./components/user/login/login.component";
import { SignUpComponent } from "./components/user/sign-up/sign-up.component";
import { UserGuard } from "./components/user/user.guard";
import { TeamComponent } from "./components/team/team.component";

const routes: Routes = [
  {
    path: "",
    component: StoryListComponent
  },
  {
    path: "characters",
    component: CharacterListComponent
  },
  {
    path: "character/create",
    component: CharacterPostComponent
  },
  {
    path: "character/edit/:characterId",
    component: CharacterPostComponent
  },
  {
    path: "story/create",
    component: StoryPostComponent
  },
  {
    path: "story/edit/:storyId",
    component: StoryPostComponent
  },
  {
    path: "comments",
    component: CommentListComponent
  },
  {
    path: "comment/create",
    component: CommentPostComponent
  },
  {
    path: "comment/edit/:commentId",
    component: CommentPostComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "team",
    component: TeamComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserGuard]
})
export class AppRoutingModule {}
