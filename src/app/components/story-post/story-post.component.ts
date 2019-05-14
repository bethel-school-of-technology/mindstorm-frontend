import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Story } from '../../shared/story.model';
import { StoryService } from '../../shared/story.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-story-post',
  templateUrl: './story-post.component.html',
  styleUrls: ['./story-post.component.css']
})
export class StoryPostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
