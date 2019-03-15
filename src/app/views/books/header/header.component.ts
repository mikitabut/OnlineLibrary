import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Book } from '../../../entities/book';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/authService';
import { HeaderService } from './header.service';

declare var VK: any;

@Component({
    selector: 'header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    books: Book[];
    username: string;
    usernameSubscr: Subscription;
    userVkIdExist: boolean;

    @ViewChild('drawer') drawer;

    constructor(private headerService: HeaderService, private authService: AuthenticationService) {
        this.usernameSubscr = this.authService.username.subscribe(value => (this.username = value));
        this.username = this.authService.getLogged()
            ? this.authService.getLogged().username
            : undefined;
        this.userVkIdExist = this.authService.getLogged()
            ? !!this.authService.getLogged().userVkId
            : false;

        VK.init({ apiId: 6780881 });
    }

    ngOnInit() {
        VK.Widgets.Auth('vk_auth', { authUrl: '/auth-vk/' });
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

    toggle() {
        this.userVkIdExist = this.authService.getLogged()
            ? !!this.authService.getLogged().userVkId
            : false;
        if (this.username) {
            this.drawer.toggle();
        }
    }

    regirectToVkLogin() {
        this.authService.redirectToVkLogin();
    }
}
