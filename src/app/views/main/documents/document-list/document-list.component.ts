import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DocumentService } from "@services/document.service";
import { Document } from "@shared/entities/document";
import { DocumentFirestoreService } from '@services/document-firestore.service';

@Component({
  selector: 'document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnChanges {
  @Input() topicId: number;
  @Output() nextTopicViewEvent = new EventEmitter<string>();

  documents: Document[];
  loading: boolean;

  constructor(
      private documentService: DocumentFirestoreService
  ) {
      this.documents = [];
  }

  ngOnInit(): void {

  }

  handleNextTopicViewButton(): void {
      this.nextTopicViewEvent.emit('create');
  }

  ngOnChanges(): void {
    this.loading = true;
    this.documentService
      .getDocumentsByTopicId(this.topicId)
      .subscribe(documents => {
          if (this.documents.length !== 0) {
              this.documents.length = 0;
          }

          documents.forEach(document => {
              this.documents.push(document);
          });

          this.loading = false;
      });
  }
}
