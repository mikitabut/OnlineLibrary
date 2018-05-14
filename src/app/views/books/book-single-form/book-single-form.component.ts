import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { Book } from '../../../entities/book';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ObserveOnOperator } from 'rxjs/operators/observeOn';
import { BooksService } from '../books.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../services/authService';
import { HeaderService } from '../header/header.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'book-single-form',
    styleUrls: ['./book-single-form.component.css'],
    templateUrl: './book-single-form.component.html',
})
export class BookViewComponent {
    viewport: any;
    context: any;
    hasPermissions: boolean;
    pageBookName: string;
    @Output() booksEmitter: EventEmitter<Book> = new EventEmitter<Book>();
    @ViewChild('canvasPdf') canvasPdf: ElementRef;

    public id: string;
    public name: string;
    public authorName: string;
    public simplePart: string;

    public currentPage = 1;
    public currentPdf;

    constructor(
        private bookService: BooksService,
        private snackBar: MatSnackBar,
        private authService: AuthenticationService,
        private header: HeaderService,
        private activateRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.activateRoute.params.subscribe(params => {
            this.pageBookName = params['name'];
            this.bookService.getBookByName(this.pageBookName).subscribe(
                currentBook => {
                    this.name = currentBook && currentBook.name;
                    this.authorName = currentBook && currentBook.authorName;
                    this.simplePart = currentBook && currentBook.description;
                    this.id = currentBook && currentBook.id;
                    this.bookService.getPdf(this.id).then(
                        pdf => {
                            this.currentPdf = pdf;
                            this.updatePdf();
                        },
                        error => this.snackBar.open(error, 'OK'),
                    );
                },
                error => {
                    this.snackBar.open(error.status + ':' + error.json().data, 'OK');
                },
            );
        });
        this.authService.username.subscribe(value => {
            this.bookService.getBooksByUsername(value, this.authService.token).subscribe(
                books => {
                    const book = books.find(bookEntity => bookEntity.name === this.pageBookName);
                    this.hasPermissions = !!book;
                },
                error => {
                    this.hasPermissions = false;
                },
            );
        });
        if (!!this.authService.getLogged()) {
            this.authService.username.next(this.authService.getLogged().username);
        }
    }

    canSubmitted(): any {
        return this.name && this.authorName && this.simplePart;
    }

    onSubmit() {
        if (this.canSubmitted()) {
            this.bookService
                .updateBookByName(
                    this.pageBookName,
                    new Book({
                        authorName: this.authorName,
                        description: this.simplePart,
                        file: undefined,
                        id: this.id,
                        name: this.name,
                    }),
                    this.authService.token,
                )
                .subscribe(
                    book => {
                        this.name = book.name;
                        this.authorName = book.authorName;
                        this.simplePart = book.description;
                        this.snackBar.open('Book was changed successfully', 'OK');
                    },
                    error => this.snackBar.open(error.status + ':' + error.json().data, 'OK'),
                );
        } else {
            this.snackBar.open('You should set all fields!', 'OK');
        }
    }

    prepareCanvas(page) {
        const scale = 1;
        this.viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions.
        this.context = this.canvasPdf.nativeElement.getContext('2d');
        this.canvasPdf.nativeElement.height = this.viewport.height;
        this.canvasPdf.nativeElement.width = this.viewport.width;
    }

    nextPage() {
        if (this.currentPage < this.currentPdf.numPages) {
            this.currentPage++;
            this.updatePdf();
        }
    }
    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePdf();
        }
    }

    updatePdf() {
        this.currentPdf.getPage(this.currentPage).then(page => {
            if (!this.context || !this.viewport) {
                this.prepareCanvas(page);
            }
            // Render PDF page into canvas context.
            const renderContext = {
                canvasContext: this.context,
                viewport: this.viewport,
            };
            page.render(renderContext);
        });
    }
}
