import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DocumentFirestoreService } from '@services/document-firestore.service';
import {Document} from "@shared/entities/document";

@Component({
  selector: 'document-create',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent implements OnInit {
  @Input() topicId: number;
  @Output() nextTopicViewEvent = new EventEmitter<string>();

  document: Document;

  constructor(
      private documentService: DocumentFirestoreService
  ) { }

  ngOnInit(): void {
    this.document = new Document();
  }

  handleNextTopicViewButton(): void {
    this.nextTopicViewEvent.emit('list');
  }

  createDocument(): void {
    this.document.topicId = this.topicId;

    this.documentService.inserir(this.document).subscribe(
        data => {
          this.document = new Document();
          this.nextTopicViewEvent.emit('list');
        },
        error => {
          alert(error);
        }
    );
  }
}
