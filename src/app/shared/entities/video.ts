import { SafeResourceUrl } from '@angular/platform-browser';

export class Video {
  id?: number | string;
  videoUrl: string;
  embedUrl: string | SafeResourceUrl;
  topicId: number | string;

  constructor(videoData?: Video, id?: string) {
    if (videoData) {
      this.id = id;
      this.videoUrl = videoData.videoUrl;
      this.embedUrl = videoData.embedUrl;
      this.topicId = videoData.topicId;
    }
  }
}
