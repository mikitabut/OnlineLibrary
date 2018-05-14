import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { Book } from '../../../entities/book';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ObserveOnOperator } from 'rxjs/operators/observeOn';
import { BooksService } from '../books.service';
import { MatSnackBar } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { User, AuthenticationService } from '../../../services/authService';
import { HeaderService } from './header.service';

@Component({
    selector: 'header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    books: Book[];
    username: string;
    usernameSubscr: Subscription;

    constructor(private headerService: HeaderService, private authService: AuthenticationService) {
        this.usernameSubscr = this.authService.username.subscribe(value => (this.username = value));
        this.username = this.authService.getLogged()
            ? this.authService.getLogged().username
            : undefined;
    }

    logout() {
        this.books = [];
        this.authService.logout();
    }

    getUserBooks() {
        this.headerService.getBooksByUsername(this.username).subscribe(
            books => (this.books = books),
            error => {
                this.authService.logout();
            },
        );
    }
}
