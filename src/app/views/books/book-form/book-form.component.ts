import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../../entities/book';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ObserveOnOperator } from 'rxjs/operators/observeOn';
import { BooksService } from '../books.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'app-book-form',
    styleUrls: ['./book-form.component.css'],
    templateUrl: './book-form.component.html',
})
export class BookFormComponent {
    @Output() booksEmitter: EventEmitter<Book> = new EventEmitter<Book>();

    private userGroup: number;
    public name: string;
    public authorName: string;
    public simplePart: string;
    public file: File;

    constructor(private bookService: BooksService, private snackBar: MatSnackBar) {}

    onFileChange(event) {
        const files: FileList = event.target.files;
        if (files.length > 0) {
            this.file = files[0];
        }
    }

    onSubmit() {
        if (this.canSubmitted()) {
            this.booksEmitter.emit(
                new Book({
                    authorName: this.authorName,
                    description: this.simplePart,
                    file: this.file,
                    id: 0,
                    name: this.name,
                }),
            );
        } else {
            this.snackBar.open('You shoul set all fields!', 'OK');
        }
    }

    canSubmitted() {
        return this.name && this.authorName && this.simplePart && this.file && this.file;
    }
}
