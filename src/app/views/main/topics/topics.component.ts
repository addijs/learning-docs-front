import { Component, Input, OnInit } from '@angular/core';
import { Topic } from '@shared/entities/topic';
import { TopicFirestoreService } from '@services/topic-firestore.service';

@Component({
  selector: 'main-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
})
export class TopicsComponent implements OnInit {
  @Input() userId: number;

  topic: Topic;
  topics: Topic[];
  activeTopicId: number;
  loading: boolean;

  constructor(
      private topicService: TopicFirestoreService
  ) {
    this.topic = new Topic();
    this.topics = [];
    this.loading = true;
  }

  ngOnInit(): void {
    this.topicService
      .getTopicsByUserId(this.userId)
      .subscribe(topics => {
        this.topics = [...topics];
        this.loading = false;
      });
  }

  selectTopic(id: number): void {
    this.topicService.handleSelectedTopic(id);
    this.activeTopicId = id;
  }

  isActive(id: number): boolean {
    return id === this.activeTopicId;
  }

  createTopic(): void {
    this.topic.userId = this.userId;
    this.topicService.inserir(this.topic).subscribe(
      () => {
        this.topics.push(this.topic);
      },
      error => {
        alert(error);
      }
    );

    this.topic = new Topic();
  }

  deleteTopic(id: number): void {
    this.topicService.remover(String(id)).subscribe(() => {
      const newTopicsArray = this.topics.filter(topic => topic.id !== id);
      this.topics = [...newTopicsArray];
    });
    // this.topicService.deleteTopic(String(id)).subscribe(() => {
    //     const newTopicsArray = this.topics.filter(topic => topic.id !== id);
    //     this.topics = [...newTopicsArray];
    // });

    if (this.activeTopicId === id) {
      this.topicService.handleSelectedTopic(null);
    }
  }
}
