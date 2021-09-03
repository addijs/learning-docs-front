export class Document {
  id: number | string;
  title: string;
  content: string;
  topicId: number;

  constructor(documentData?: Document, id?: string) {
    if (documentData) {
      this.id = id;
      this.title = documentData.title;
      this.content = documentData.content;
      this.topicId = documentData.topicId;
    }
  }
}
