import { SafeResourceUrl } from '@angular/platform-browser';

export class Video {
  id?: number;
  videoUrl: string;
  embedUrl: string | SafeResourceUrl;
  user_id: number;
}