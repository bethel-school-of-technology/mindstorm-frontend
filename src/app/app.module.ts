import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CharacterPostComponent } from "./components/character-post/character-post.component";
import { CharacterListComponent } from "./components/character-list/character-list.component";
import { StoryPostComponent } from "./components/story-post/story-post.component";
import { StoryListComponent } from "./components/story-list/story-list.component";
import { CommentPostComponent } from "./components/comment-post/comment-post.component";
import { CommentListComponent } from "./components/comment-list/comment-list.component";
import { SignUpComponent } from "./components/user/sign-up/sign-up.component";
import { LoginComponent } from "./components/user/login/login.component";
import { ErrorComponent } from "./error/error.component";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { ProfilePageComponent } from "./components/profile-page/profile-page.component";
import { Interceptor } from "./components/user/interceptors";
import { ErrorInterceptor } from "./error.interceptor";
import { TeamComponent } from "./components/team/team.component";
import { JacobComponent } from "./components/team/jacob/jacob.component";
import { MariaComponent } from "./components/team/maria/maria.component";
import { TavoComponent } from "./components/team/tavo/tavo.component";
import { MartyComponent } from "./components/team/marty/marty.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { AutofocusDirective } from './shared/auto-focus.directive';

/** Angular Material imports. */
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatDialogModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatTabsModule,
  MatIconModule,
  MatSlideToggleModule
} from "@angular/material";

/** The bootstrapper module. */
@NgModule({
  declarations: [
    AppComponent,
    CharacterPostComponent,
    CharacterListComponent,
    StoryPostComponent,
    StoryListComponent,
    CommentListComponent,
    CommentPostComponent,
    SignUpComponent,
    LoginComponent,
    ErrorComponent,
    ConfirmationDialogComponent,
    ProfilePageComponent,
    TeamComponent,
    MartyComponent,
    MariaComponent,
    TavoComponent,
    JacobComponent,
    MainNavComponent,
    ProfilePageComponent,
    AutofocusDirective
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTabsModule,
    LayoutModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, ConfirmationDialogComponent]
})
export class AppModule { }
