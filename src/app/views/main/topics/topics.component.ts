import { Component, OnInit } from '@angular/core';
import { Topic } from '@shared/entities/topic';
import { TopicService } from 'app/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topic: Topic;
  topics: Object[];
  

  constructor(private topicService: TopicService) {
    this.topic = new Topic();
   }

  ngOnInit(): void {
    this.topicService.listar().subscribe(
      topics => this.topics = topics
    );
  }

  createTopic(): void{
    this.topic.user_id = parseInt(localStorage.getItem('loggedUser'))
    this.topicService.inserir(this.topic).subscribe(
      data => {
        console.log(data);
      })
    this.topic = new Topic();
  }

}
