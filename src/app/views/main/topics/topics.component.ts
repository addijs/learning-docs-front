import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Topic } from '@shared/entities/topic';
import { TopicService } from 'app/services/topic.service';

@Component({
  selector: 'main-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
})
export class TopicsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() topicId: number;
  @ViewChildren('topicList') topicList: QueryList<ElementRef<HTMLDivElement>>;

  topic: Topic;
  topics: Topic[];
  activeTopicId: number;


  constructor(private topicService: TopicService) {
    this.topic = new Topic();
    this.topics = [];
  }

  ngOnInit(): void {
    this.topicService
        .listar()
        .subscribe(topics => {
        this.topics = [...topics];
      });
  }

  ngOnChanges(): void {}

  ngAfterViewInit(): void {
    console.log(this.topicList);
  }

  // topicsIsEmpty(): boolean {
  //   if (this.topics.length === 0) {
  //     return true;
  //   }

  //   return false;
  // }

  selectTopic(id: number): void {
    TopicService.emitSelectedTopic.emit(id);
    this.activeTopicId = id;
  }

  isActive(id: number): boolean {
    return id === this.activeTopicId;
  }

  createTopic(): void {
    this.topicService.inserir(this.topic).subscribe(
      data => {
        this.topics.push(data);
      },
      err => {
        console.log(err)
        alert(err.error.message)
      }
    );

    this.topic = new Topic();
  }

  deleteTopic(id: number): void {
    this.topicService.remover(id).subscribe(() => {
      const newTopicsArray = this.topics.filter(topic => topic.id !== id);
      this.topics = [...newTopicsArray];
    });

    if (this.topicId === id) {
      TopicService.emitSelectedTopic.emit(undefined);
    }
  }
}
