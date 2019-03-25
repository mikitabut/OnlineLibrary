import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../services/authService';
import { BooksService } from '../books.service';

@Injectable()
export class HeaderService {
    constructor(private authService: AuthenticationService, private bookService: BooksService) {}

    public getBooksByUsername(username) {
        if (!!this.authService.getLogged()) {
            return this.bookService.getBooksByUsername(username, this.authService.token);
        } else {
            return of([]);
        }
    }
}
