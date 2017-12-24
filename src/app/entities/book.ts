import { EMPTY, EMPTY_AGE } from './constants';

export class Book {
  private author: Author;
  private text: string;

  constructor() {
    this.author = new Author(EMPTY, EMPTY, EMPTY_AGE);
  }
}

export class Author {
  private name: string;
  private lastName: string;
  private age: number;
  constructor(name: string, lastName: string, age: number) {
    this.name = name;
    this.lastName = lastName;
    this.age = age;
  }
}
