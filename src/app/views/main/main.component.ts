import { Component, OnInit } from '@angular/core';

class Document {
  title: string;
  content: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  document: Document;
  documents: Document[] = [];

  constructor() {
    this.document = new Document();
  }

  ngOnInit(): void {}

  createDocument(): void {
    this.documents.push(this.document);
    this.document = new Document();
  }
}
