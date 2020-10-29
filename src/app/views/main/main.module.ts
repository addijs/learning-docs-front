import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { TopicsComponent } from './topics/topics.component';

@NgModule({
  declarations: [MainComponent, TopicsComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
