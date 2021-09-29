import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from '@shared/entities/video';
import { VideoFirestoreService } from '@services/video-firestore.service';
import { TopicFirestoreService } from '@services/topic-firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit, OnDestroy {
  private DOMAIN_URI = 'http://www.youtube.com/embed/';

  video: Video;
  videos: Video[];
  topicId: number;
  topicSubscription: Subscription;
  loading: boolean;

  constructor(
    private topicService: TopicFirestoreService,
    private videoService: VideoFirestoreService,
    private sanitizer: DomSanitizer
  ) {
    this.video = new Video();
    this.videos = [];
    this.loading = true;
  }

  ngOnInit(): void {
    this.topicSubscription = this.topicService.selectedTopicId$.subscribe(topicId => {
      this.topicId = topicId

      this.videoService.getVideosByTopicId(String(topicId)).subscribe(videos => {
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

        this.loading = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.topicSubscription.unsubscribe();
  }

  addVideo(): void {
    this.video.topicId = this.topicId;
    this.video.embedUrl = this.getEmbedUrl();

    this.videoService.inserir(this.video).subscribe(
      () => {
        const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.video.embedUrl as string
        );

        this.video.embedUrl = sanitizedUrl;

        this.videos.push(this.video);
        this.video = new Video();
      },
      error => {
        alert(error);
      }
    );
  }

  removeVideo(id: number): void {
    this.videoService.remover(String(id)).subscribe(() => {
      const newVideosArray = this.videos.filter(video => video.id !== id);
      this.videos = [...newVideosArray];
    });
  }

  private getEmbedUrl() {
    const [, videoId] = this.video.videoUrl.split('watch?v=');
    const embedUrl = this.DOMAIN_URI + videoId;

    return embedUrl;
  }
}
