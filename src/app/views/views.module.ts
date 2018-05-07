import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsComponent } from './views.component';
import { BooksModule } from './books/books.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ViewsComponent],
    exports: [ViewsComponent],
    imports: [CommonModule, BooksModule, FormsModule],
})
export class ViewsModule {}
