import { Component, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Book } from '../../../entities/book';
import * as NotificationActions from '../../../actions/notification.actions';
import * as UserActions from '../../../actions/user.actions';
import * as BooksActions from '../../../actions/books.actions';
import {
    getHasManagedBookByName,
    getSingleBook,
    getPdfSingleBook,
} from '../../../reducers/books.reducers';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'single-book-form',
    styleUrls: ['./single-book-form.component.css'],
    templateUrl: './single-book-form.component.html',
})
export class SingleBookFormComponent implements OnInit {
    viewport: any;
    context: any;
    hasPermissions: Subscription;
    pageBookName: string;
    @Output() booksEmitter: EventEmitter<Book> = new EventEmitter<Book>();
    @ViewChild('canvasPdf') canvasPdf: ElementRef;

    public id: string;
    public name: string;
    public authorName: string;
    public simplePart: string;

    public currentPage = 1;
    public currentPdf;
    singleBook: Observable<any>;
    pdfSingleBook: Observable<Book>;

    constructor(private activateRoute: ActivatedRoute, private store: Store<any>) {
        this.singleBook = this.store.pipe(select(getSingleBook)).pipe(
            map(book => {
                if (book) {
                    this.name = book.name;
                    this.authorName = book.authorName;
                    this.simplePart = book.description;
                    this.id = book.id;
                }

                return book;
            }),
        );

        this.pdfSingleBook = this.store.pipe(select(getPdfSingleBook)).pipe(
            map(pdf => {
                if (pdf) {
                    this.currentPdf = pdf;
                    this.updatePdf();
                }
                return pdf;
            }),
        );
        this.hasPermissions = this.activateRoute.params
            .pipe(
                map(params => {
                    this.pageBookName = decodeURI(params['name']);
                    this.store.dispatch(new BooksActions.FetchSingleBook(this.pageBookName));
                    return this.pageBookName;
                }),
                switchMap(pageBookName =>
                    this.store.pipe(select(getHasManagedBookByName, pageBookName)),
                ),
            )
            .subscribe();
    }

    ngOnInit() {
        this.store.dispatch(new UserActions.GetProfile(null));
        this.store.dispatch(new BooksActions.FetchManagedBooks(null));
    }

    canSubmitted(): any {
        return this.name && this.authorName && this.simplePart;
    }

    onSubmit() {
        if (this.canSubmitted()) {
            this.store.dispatch(
                new BooksActions.EditSingleBookByName({
                    bookName: this.pageBookName,
                    book: new Book({
                        authorName: this.authorName,
                        description: this.simplePart,
                        file: undefined,
                        id: this.id,
                        name: this.name,
                    }),
                }),
            );
        } else {
            this.store.dispatch(
                new NotificationActions.ShowNotification('You should set all fields!'),
            );
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
        if (this.canvasPdf) {
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
}
