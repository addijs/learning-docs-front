export class Topic {
  id?: number | string;
  name?: String;
  user_id?: number | string;

  constructor(id?: string, topicData: Topic = {}) {
    this.id = id;
    this.name = topicData.name;
    this.user_id = topicData.user_id;
  }
}
