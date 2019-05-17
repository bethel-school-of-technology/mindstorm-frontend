import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CharacterPostComponent } from './components/character-post/character-post.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { StoryPostComponent } from './components/story-post/story-post.component';
import { StoryListComponent } from './components/story-list/story-list.component';
import { CommentPostComponent } from './components/comment-post/comment-post.component';
import { HeaderComponent } from './components/header/header.component';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatDividerModule,
  MatListModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CharacterPostComponent,
    CharacterListComponent,
    HeaderComponent,
    StoryPostComponent,
    StoryListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
