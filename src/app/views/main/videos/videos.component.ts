import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from '@shared/entities/video';
import { VideoService } from 'app/services/video.service';

@Component({
  selector: 'main-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit, OnChanges {
  private domain = 'http://www.youtube.com/embed/';

  @Input() topicId: number;

  video: Video;
  videos: Video[];

  constructor(
    private videoService: VideoService,
    private sanitizer: DomSanitizer
  ) {
    this.video = new Video();
    this.videos = [];
  }

  ngOnChanges(): void {
    this.videoService.getVideosByTopicId(this.topicId).subscribe(videos => {
      if (this.videos.length !== 0) {
        this.videos.length = 0;
      }

      videos.forEach(video => {
        const embedUrl = video.embedUrl;
        video.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          embedUrl as string
        );
        this.videos.push(video);
      });
    });
  }

  ngOnInit(): void {}

  addVideo(): void {
    this.video.topic_id = this.topicId;
    this.video.embedUrl = this.getEmbedUrl();

    this.videoService.inserir(this.video).subscribe(
      data => {
        const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.video.embedUrl as string
        );

        data.embedUrl = sanitizedUrl;

        this.videos.push(data);
        this.video = new Video();
      },
      error => {
        alert(error);
      }
    );
  }

  removeVideo(id: number): void {
    this.videoService.remover(id).subscribe(() => {
      const newVideosArray = this.videos.filter(video => video.id !== id);
      this.videos = [...newVideosArray];
    });
  }

  private getEmbedUrl() {
    const [, videoId] = this.video.videoUrl.split('watch?v=');
    const embedUrl = this.domain + videoId;

    return embedUrl;
  }
}
