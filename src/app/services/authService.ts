import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { environment } from '../../environments/environment';
import { vkLoginRedirectUrl } from '../entities/constants';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

export interface User {
    username: string;
    password: string;
}

@Injectable()
export class AuthenticationService {
    public token: string;
    public username: Subject<string>;

    constructor(private http: HttpClient, @Inject(DOCUMENT) private doc) {
        // set token if saved in local storage
        this.username = new Subject();
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.username.next(currentUser && currentUser.username);
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http
            .post(API_URL + '/auth', { username: username.trim(), password: password.trim() })
            .pipe(
                map((response: any) => {
                    // login successful if there's a jwt token in the response
                    const token = response && response.data.jwtToken;
                    const userVkId = response && response.data.userVkId;
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
                }),
            );
    }
    register(username: string, password: string): Observable<boolean> {
        return this.http.post(API_URL + '/auth/reg', { username, password }).pipe(
            map((response: any) => {
                // login successful if there's a jwt token in the response
                const token = response && response.data.jwtToken;
                const userVkId = response && response.data.userVkId;
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
            }),
        );
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
            .pipe(
                map((response: any) => {
                    return response.ok;
                }),
            );
    }

    redirectToVkLogin() {
        this.doc.location.href = vkLoginRedirectUrl;
    }

    public getLogged() {
        return JSON.parse(sessionStorage.getItem('currentUser'));
    }
}
