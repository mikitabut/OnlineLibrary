import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './views/books/book-view/books.component';
import { BookViewComponent } from './views/books/book-single-form/book-single-form.component';
import { NotFoundComponent } from './views/books/not-found/not-found.component';
import { BooksModule } from './views/books/books.module';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule, NgbModule.forRoot(), BrowserAnimationsModule, BooksModule],
    providers: [],
})
export class AppModule {}
