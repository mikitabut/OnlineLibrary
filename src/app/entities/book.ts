import { EMPTY, EMPTY_AGE } from './constants';

export class Book {
  private id: number;
  private name: string;
  private author: Author;
  private simplePart: string;

  constructor({ id, name, author, description }) {
    this.id = id;
    this.name = name;
    this.author = author || new Author(EMPTY, EMPTY, EMPTY);
    this.simplePart = description || EMPTY;
  }
}

export class Author {
  private name: string;
  private lastName: string;
  private bio: string;
  constructor(name: string, lastName: string, bio: string) {
    this.name = name;
    this.lastName = lastName;
    this.bio = bio;
  }
}
