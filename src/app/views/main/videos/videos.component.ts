import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from '@shared/entities/video';
import { VideoService } from 'app/services/video.service';
import { UserData } from '../topics/topics.component';

@Component({
  selector: 'main-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {
  private domain = 'http://www.youtube.com/embed/';
  video: Video;
  videos: Video[];

  private loggedUser: UserData;

  constructor(
    private videoService: VideoService,
    private sanitizer: DomSanitizer
  ) {
    this.video = new Video();
    this.videos = [];
  }

  ngOnInit(): void {
    this.loggedUser = this.getUserFromLocalStorage();

    this.videoService
      .getVideosByUserId(this.loggedUser.id)
      .subscribe(videos => {
        videos.forEach(video => {
          const embedUrl = video.embedUrl;
          video.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            embedUrl as string
          );
          this.videos.push(video);
        });
      });
  }

  addVideo(): void {
    this.video.user_id = this.loggedUser.id;
    this.video.embedUrl = this.getEmbedUrl();

    this.videoService.inserir(this.video).subscribe(
      data => {
        console.log(data);

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

  private getUserFromLocalStorage(): UserData {
    const stringfiedUser = localStorage.getItem('loggedUser');
    const user: UserData = JSON.parse(stringfiedUser);

    return user;
  }

  private getEmbedUrl() {
    const [, videoId] = this.video.videoUrl.split('watch?v=');
    const embedUrl = this.domain + videoId;

    return embedUrl;
  }
}
