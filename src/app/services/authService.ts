import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import { environment } from '../../environments/environment';
import { vkLoginRedirectUrl } from '../entities/constants';

const API_URL = environment.apiUrl;

export interface User {
    username: string;
    password: string;
}

@Injectable()
export class AuthenticationService {
    public token: string;
    public username: Subject<string>;

    constructor(private http: Http, @Inject(DOCUMENT) private doc) {
        // set token if saved in local storage
        this.username = new Subject();
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.username.next(currentUser && currentUser.username);
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http
            .post(API_URL + '/auth', { username: username.trim(), password: password.trim() })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().data.jwtToken;
                const userVkId = response.json() && response.json().data.userVkId;
                if (token) {
                    // set token property
                    this.token = token;
                    this.username.next(username);

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem(
                        'currentUser',
                        JSON.stringify({ username, token, userVkId }),
                    );

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
    register(username: string, password: string): Observable<boolean> {
        return this.http
            .post(API_URL + '/auth/reg', { username, password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().data.jwtToken;
                const userVkId = response.json() && response.json().data.userVkId;
                if (token) {
                    // set token property
                    this.token = token;
                    this.username.next(username);

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem(
                        'currentUser',
                        JSON.stringify({ username, token, userVkId: null }),
                    );

                    return true;
                } else {
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        sessionStorage.removeItem('currentUser');
        this.username.next(undefined);
    }

    updateUserVkId(userVkId: string) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        return this.http
            .post(API_URL + '/auth/update-vk-id', { username: currentUser.username, userVkId })
            .map((response: Response) => {
                return response.ok;
            });
    }

    redirectToVkLogin() {
        this.doc.location.href = vkLoginRedirectUrl;
    }

    public getLogged() {
        return JSON.parse(sessionStorage.getItem('currentUser'));
    }
}
