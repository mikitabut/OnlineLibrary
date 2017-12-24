import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsComponent } from './views.component';
import { BooksModule } from './books/books.module';

@NgModule({
  exports: [ViewsComponent],
  imports: [CommonModule, BooksModule],
  declarations: [ViewsComponent],
})
export class ViewsModule {}
