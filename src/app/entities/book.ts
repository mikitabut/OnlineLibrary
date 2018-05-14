import { EMPTY, EMPTY_AGE } from './constants';

export class Book {
    public id: string;
    public name: string;
    public authorName: string;
    public description: string;
    public file: File;

    constructor({ id, name, authorName, description, file }) {
        this.id = id;
        this.name = name;
        this.authorName = authorName;
        this.description = description || EMPTY;
        this.file = file;
    }
}

export class Author {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }
}
