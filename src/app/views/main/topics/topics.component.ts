import { Component, OnInit } from '@angular/core';
import { Topic } from '@shared/entities/topic';
import { TopicService } from 'app/services/topic.service';

export interface UserData {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
})
export class TopicsComponent implements OnInit {
  topic: Topic;
  topics: Topic[];

  private loggedUser: UserData;

  constructor(private topicService: TopicService) {
    this.topic = new Topic();
    this.topics = [];
  }

  ngOnInit(): void {
    // this.topicService.listar().subscribe(topics => (this.topics = [...topics]));
    this.loggedUser = this.getUserFromLocalStorage();
    this.topicService
      .getTopicsByUserId(this.loggedUser.id)
      .subscribe(topics => {
        this.topics = [...topics];
      });
  }

  topicsIsEmpty(): boolean {
    if (this.topics.length === 0) {
      return true;
    }

    return false;
  }

  selectTopic(id: number): void {
    TopicService.emitSelectedTopic.emit(id);
  }

  createTopic(): void {
    this.topic.user_id = this.loggedUser.id;
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
  }

  private getUserFromLocalStorage(): UserData {
    const stringfiedUser = localStorage.getItem('loggedUser');
    const user: UserData = JSON.parse(stringfiedUser);

    return user;
  }
}
