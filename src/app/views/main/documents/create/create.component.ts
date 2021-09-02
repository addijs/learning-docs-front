import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DocumentService} from "@services/document.service";
import {Document} from "@shared/entities/document";

@Component({
  selector: 'document-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() topicId: number;
  @Output() nextTopicViewEvent = new EventEmitter<string>();

  document: Document;

  constructor(
      private documentService: DocumentService
  ) { }

  ngOnInit(): void {
    this.document = new Document();
  }

  handleNextTopicViewButton(): void {
    this.nextTopicViewEvent.emit('list');
  }

  createDocument(): void {
    this.document.topic_id = this.topicId;

    this.documentService.inserir(this.document).subscribe(
        data => {
          this.document = new Document();
        },
        error => {
          alert(error);
        }
    );
  }

}
