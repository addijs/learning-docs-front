export class Topic {
  id?: number | string;
  name: String;
  userId: number | string;

  constructor(topicData?: Topic, id?: string) {
    if (topicData) {
      this.id = id;
      this.name = topicData.name;
      this.userId = topicData.userId;
    }
  }
}
