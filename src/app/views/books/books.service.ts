import { Injectable } from '@angular/core';
import { Book } from '../../entities/book';

@Injectable()
export class BooksService {
  constructor() {}

  // Rewrite with database
  public getBooks(): Book[] {
    return [new Book()];
  }
}
