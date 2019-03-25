import { Component, Output, EventEmitter } from '@angular/core';
import { BooksService } from '../books.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../../../services/authService';

@Component({
    selector: 'auth-form',
    styleUrls: ['./auth-form.component.css'],
    templateUrl: './auth-form.component.html',
})
export class AuthFormComponent {
    @Output() authEmitter: EventEmitter<User> = new EventEmitter<User>();
    public usernameAuth: string;
    public passwordAuth: string;

    constructor(private bookService: BooksService, private snackBar: MatSnackBar) {}

    onSubmitAuth() {
        if (this.canSignIn()) {
            this.authEmitter.emit({
                password: this.passwordAuth,
                username: this.usernameAuth,
            } as User);
        } else {
            this.snackBar.open('You should set all fields!', 'OK');
        }
    }

    canSignIn() {
        return this.usernameAuth && this.passwordAuth;
    }
}
