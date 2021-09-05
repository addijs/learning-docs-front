import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListComponent } from '@views/main/documents/document-list/document-list.component';
import { DocumentFormComponent } from '@views/main/documents/document-form/document-form.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [DocumentListComponent, DocumentFormComponent],
  exports: [DocumentListComponent, DocumentFormComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DocumentsModule { }
