import { Component, OnInit } from '@angular/core';

class Document {
  title: string;
  content: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
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
