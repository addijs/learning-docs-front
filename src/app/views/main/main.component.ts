import { Component, OnInit } from '@angular/core';
import { TopicService } from 'app/services/topic.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  selectedTopicId: number;

  constructor() {}

  ngOnInit(): void {
    TopicService.emitSelectedTopic.subscribe(topicId => {
      this.selectedTopicId = topicId;
    });
  }
}
