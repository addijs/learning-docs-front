import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListComponent} from "@views/main/documents/list/list.component";
import {CreateComponent} from "@views/main/documents/create/create.component";
import {SharedModule} from "@shared/shared.module";

@NgModule({
  declarations: [ListComponent, CreateComponent],
  exports: [ListComponent, CreateComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DocumentsModule { }
