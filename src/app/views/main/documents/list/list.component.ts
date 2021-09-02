import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DocumentService } from "@services/document.service";
import { Document } from "@shared/entities/document";

@Component({
  selector: 'document-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() topicId: number;
  @Output() nextTopicViewEvent = new EventEmitter<string>();

  documents: Document[] = [];

  constructor(
      private documentService: DocumentService
  ) { }

  ngOnInit(): void {

  }

  handleNextTopicViewButton(): void {
      this.nextTopicViewEvent.emit('create');
  }

  ngOnChanges(): void {
    this.documentService
      .getDocumentsByTopicId(this.topicId)
      .subscribe(documents => {
          if (this.documents.length !== 0) {
              this.documents.length = 0;
          }

          documents.forEach(document => {
              this.documents.push(document);
          });
      });
  }
}
