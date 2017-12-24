import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { Book } from '../../entities/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  private books: Book[];
  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.booksService.getBooks().subscribe(books => {
      this.books = books;
    });
  }
}
