import { Component, OnInit } from '@angular/core';
import {TopicService} from "@services/topic.service";

@Component({
  selector: 'main-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  view: string;
  topicId: number;

  constructor(
      private topicService: TopicService
  ) { }

  changeView(view: string) {
    this.view = view;
  }

  ngOnInit(): void {
    this.topicService.selectedTopicId$.subscribe(topicId => {
      this.topicId = topicId;
      this.view = 'list'
    });
  }
}
