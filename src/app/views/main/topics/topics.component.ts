import { Component, Input, OnInit } from '@angular/core';
import { Topic } from '@shared/entities/topic';
import { TopicService } from 'app/services/topic.service';

@Component({
  selector: 'main-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
})
export class TopicsComponent implements OnInit {
  // @Input() topicId: number;
  @Input() userId: number;
  // @ViewChildren('topicList') topicList: QueryList<ElementRef<HTMLDivElement>>;

  topic: Topic;
  topics: Topic[];
  activeTopicId: number;

  constructor(
      private topicService: TopicService
  ) {
    this.topic = new Topic();
    this.topics = [];
  }

  ngOnInit(): void {
    this.topicService
      .getTopicsByUserId(this.userId)
      .subscribe(topics => {
        this.topics = [...topics];
      });
  }

  // ngAfterViewInit(): void {
  //   console.log(this.topicList);
  // }

  // topicsIsEmpty(): boolean {
  //   if (this.topics.length === 0) {
  //     return true;
  //   }

  //   return false;
  // }

  selectTopic(id: number): void {
    this.topicService.handleSelectedTopic(id);
    this.activeTopicId = id;
  }

  isActive(id: number): boolean {
    return id === this.activeTopicId;
  }

  createTopic(): void {
    // this.topic.user_id = this.loggedUser.id;
    this.topicService.inserir(this.topic).subscribe(
      data => {
        this.topics.push(data);
      },
      error => {
        alert(error);
      }
    );

    this.topic = new Topic();
  }

  deleteTopic(id: number): void {
    this.topicService.remover(id).subscribe(() => {
      const newTopicsArray = this.topics.filter(topic => topic.id !== id);
      this.topics = [...newTopicsArray];
    });

    if (this.activeTopicId === id) {
      this.topicService.handleSelectedTopic(null);
    }
  }

  // private getUserFromLocalStorage(): UserData {
  //   const stringfiedUser = localStorage.getItem('loggedUser');
  //   const user: UserData = JSON.parse(stringfiedUser);
  //
  //   return user;
  // }
}
