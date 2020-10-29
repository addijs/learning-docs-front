import { Component, OnInit } from '@angular/core';
import Topic from './model/Topic'

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topic: Topic;
  topics: Topic[] = [];

  constructor() {
    this.topic = new Topic();
   }

  ngOnInit(): void {
  }

  createTopic(): void{
    this.topics.push(this.topic)
    this.topic = new Topic();
  }

}
