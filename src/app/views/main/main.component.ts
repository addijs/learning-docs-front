import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "@services/auth.service";
import {Router} from "@angular/router";
import { TopicFirestoreService } from '@services/topic-firestore.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Subject } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { UserFirestoreService } from '@services/user-firestore.service';

interface UserData {
  id: number;
  name: string;
  email: string;
  enableNotifications: boolean;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  loggedUser: UserData
  readonly changeSlide$ = new Subject();
  private componentDestroyed$ = new Subject();

  constructor(
      private authService: AuthService,
      private userService: UserFirestoreService,
      private topicService: TopicFirestoreService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.loggedUser$.pipe(
        takeUntil(this.componentDestroyed$)
    ).subscribe(user => {
      this.loggedUser = user as UserData;
    });

    this.changeSlide$.pipe(
        debounceTime(3000),
        distinctUntilChanged(),
        takeUntil(this.componentDestroyed$)
    ).subscribe(isChecked => {
      this.userService.atualizar(this.loggedUser.id, {
        enableNotifications: isChecked as boolean
      })
    });
  }

  async logOut(): Promise<void> {
    this.authService.onUserLoggedOut();
    await this.router.navigate(['/login']);
  }

  onSlideChange(event: MatSlideToggleChange): void {
    this.changeSlide$.next(event.checked);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
