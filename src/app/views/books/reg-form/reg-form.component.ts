import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BooksService } from '../books.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../../../services/authService';

@Component({
    selector: 'reg-form',
    styleUrls: ['./reg-form.component.css'],
    templateUrl: './reg-form.component.html',
})
export class RegFormComponent {
    @Output() regEmitter: EventEmitter<User> = new EventEmitter<User>();
    public usernameReg: string;
    public passwordReg: string;

    constructor(private bookService: BooksService, private snackBar: MatSnackBar) {}

    onSubmitRegister() {
        if (this.canSignUp()) {
            this.regEmitter.emit({
                password: this.passwordReg,
                username: this.usernameReg,
            } as User);
        } else {
            this.snackBar.open('You shoul set all fields!', 'OK');
        }
    }

    canSignUp() {
        return this.usernameReg && this.passwordReg;
    }
}
