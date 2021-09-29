import { Component, OnInit } from '@angular/core';
import { TopicFirestoreService } from '@services/topic-firestore.service';

@Component({
  selector: 'main-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  view: string;
  topicId: number;

  constructor(
      private topicService: TopicFirestoreService
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
