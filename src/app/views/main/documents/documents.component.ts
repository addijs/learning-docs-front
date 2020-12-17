import { Component, Input, OnInit } from '@angular/core';
import { Document } from '@shared/entities/document';
import { DocumentService } from 'app/services/document.service';

@Component({
  selector: 'main-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  @Input() topicId: number;

  document: Document;
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {
    this.document = new Document();
  }

  ngOnChanges(): void {
      if(this.topicId != undefined){
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

  ngOnInit(): void {}

  createDocument(): void {
    this.document.topicId = this.topicId;

    this.documentService.inserir(this.document).subscribe(
      data => {
        this.documents.push(data);
        this.document = new Document();
      },
      err => {
        console.log(err);
        alert(err.error.message)
      }
    );
  }
}
