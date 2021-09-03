import { Component, OnInit } from '@angular/core';
import { TopicService } from 'app/services/topic.service';
import { AuthService } from "@services/auth.service";
import {Router} from "@angular/router";
import { TopicFirestoreService } from '@services/topic-firestore.service';

interface UserData {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  loggedUser: UserData

  constructor(
      private authService: AuthService,
      private topicService: TopicFirestoreService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe(user => {
      this.loggedUser = user as UserData;
    });
  }

  async logOut(): Promise<void> {
    this.authService.onUserLoggedOut();
    await this.router.navigate(['/login']);
  }
}
