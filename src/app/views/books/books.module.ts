import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './book-view/books.component';
import { BooksService } from './books.service';
import { EntitiesModule } from '../../entities/entities.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Http, HttpModule } from '@angular/http';
import { BookFormComponent } from './book-form/book-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatSnackBarModule } from '@angular/material';
import { BooksTableComponent } from './books-table/books-table.component';
@NgModule({
    declarations: [BooksComponent, BookFormComponent, BooksTableComponent],
    exports: [BooksComponent],
    imports: [
        CommonModule,
        EntitiesModule,
        NgbModule,
        HttpModule,
        FormsModule,
        MatTableModule,
        MatSnackBarModule,
    ],
    providers: [BooksService],
})
export class BooksModule {}
