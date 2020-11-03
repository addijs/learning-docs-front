import { Component, OnInit } from '@angular/core';
import { Topic } from '@shared/entities/topic';
import { User } from '@shared/entities/user';
import { TopicService } from 'app/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
})
export class TopicsComponent implements OnInit {
  topic: Topic;
  topics: Topic[];

  constructor(private topicService: TopicService) {
    this.topic = new Topic();
  }

  ngOnInit(): void {
    // this.topicService.listar().subscribe(topics => (this.topics = [...topics]));
    const user = this.getUserFromLocalStorage();
    this.topicService
      .getTopicsByUserId(user.id)
      .subscribe(topics => (this.topics = [...topics]));
  }

  createTopic(): void {
    this.topic.user_id = parseInt(localStorage.getItem('loggedUser'));
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

  private getUserFromLocalStorage(): User {
    const stringfiedUser = localStorage.getItem('user');
    const user: User = JSON.parse(stringfiedUser);

    return user;
  }
}
