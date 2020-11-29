import { Component, OnInit } from '@angular/core';
import { Topic } from '@shared/entities/topic';
import { User } from '@shared/entities/user';
import { TopicFirestoreService } from 'app/services/topic-firestore.service';
import { TopicService } from 'app/services/topic.service';

interface UserData {
  id: number | string;
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

  constructor(private topicService: TopicFirestoreService) {
    this.topic = new Topic();
    this.topics = [];
  }

  ngOnInit(): void {
    // this.topicService.listar().subscribe(topics => (this.topics = [...topics]));
    this.loggedUser = this.getUserFromLocalStorage();
    this.topicService
      .getTopicsByUserId(this.loggedUser.id as string)
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

  deleteTopic(id: string): void {
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
