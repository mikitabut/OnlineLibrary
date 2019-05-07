import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as NotificationActions from '../../../actions/notification.actions';
import * as BooksActions from '../../../actions/books.actions';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: 'app-book-form',
    styleUrls: ['./book-form.component.css'],
    templateUrl: './book-form.component.html',
})
export class BookFormComponent {
    public name: string;
    public authorName: string;
    public simplePart: string;
    public file: File;

    constructor(private store: Store<any>) {}

    onFileChange(event) {
        const files: FileList = event.target.files;
        if (files.length > 0) {
            this.file = files[0];
        }
    }

    onSubmit() {
        if (this.canSubmitted()) {
            this.store.dispatch(
                new BooksActions.AddNewBook({
                    authorName: this.authorName,
                    description: this.simplePart,
                    file: this.file,
                    id: '0',
                    name: this.name,
                }),
            );
        } else {
            this.store.dispatch(
                new NotificationActions.ShowNotification('You should set all fields!!!!--'),
            );
        }
    }

    canSubmitted() {
        return this.name && this.authorName && this.simplePart && this.file && this.file;
    }
}
