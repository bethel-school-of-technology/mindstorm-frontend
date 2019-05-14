import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Character } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor() { }
}
