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

    this.documentService.documentToEdit$.subscribe(document => {
      this.document = document;
    })
  }

  handleReturnButton(): void {
    this.nextTopicViewEvent.emit('list');
  }

  handleSaveButton(): void {
    if (this.document.id) {
      this.updateDocument();
    } else {
      this.createDocument();
    }
  }

  private createDocument(): void {
    this.document.topicId = this.topicId;

    this.documentService.inserir(this.document).subscribe(
        () => {
          this.document = new Document();
          this.nextTopicViewEvent.emit('list');
        },
        error => {
          alert(error);
        }
    );
  }

  private updateDocument(): void {
    this.documentService.atualizar(this.document.id, {
      title: this.document.title,
      content: this.document.content
    }).subscribe(() => {
      this.nextTopicViewEvent.emit('list');
    }, error => {
      alert(error);
    });
  }
}
