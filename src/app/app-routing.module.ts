import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterPostComponent } from './components/character-post/character-post.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {
    path: 'characterpost',
    component: CharacterPostComponent,
  },
  {
    path: 'characterlist',
    component: CharacterListComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
