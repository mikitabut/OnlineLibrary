import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../../entities/book';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ObserveOnOperator } from 'rxjs/operators/observeOn';
import { BooksService } from '../books.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
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
