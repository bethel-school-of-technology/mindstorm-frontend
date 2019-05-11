import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterPostComponent } from './components/character-post/character-post.component';
import { CharacterListComponent } from './components/character-list/character-list.component';


const routes: Routes = [
  {
    path: 'create',
    component: CharacterPostComponent,
  },
  {
    path: '',
    component: CharacterListComponent,
  },
  {
    path: 'edit/:characterId',
    component: CharacterPostComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
