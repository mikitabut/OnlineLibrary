import { Component, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { User } from '../../../services/authService';
import Decimal from 'decimal.js';
import { RSAService } from '../../../services/RSAService';

@Component({
    selector: 'auth-form',
    styleUrls: ['./auth-form.component.css'],
    templateUrl: './auth-form.component.html',
})
export class AuthFormComponent {
    @Output()
    authEmitter: EventEmitter<User> = new EventEmitter<User>();
    public usernameAuth: string;
    public passwordAuth: string;

    constructor(private snackBar: MatSnackBar, private serv: RSAService) {}

    onSubmitAuth() {
        if (this.canSignIn()) {
            this.authEmitter.emit({
                password: this.passwordAuth,
                username: this.usernameAuth,
            } as User);
        } else {
            console.log(this.serv.getKeys());
            this.snackBar.open('You should set all fields!', 'OK');
        }
    }

    canSignIn() {
        return this.usernameAuth && this.passwordAuth;
    }
}
