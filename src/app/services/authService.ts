import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';

const API_URL = environment.apiUrl;

export interface User {
    username: string;
    password: string;
}

@Injectable()
export class AuthenticationService {
    public token: string;
    public username: Subject<string>;

    constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {}

    getProfile() {
        return this.http.get(API_URL + '/auth');
    }
    login(username: string, password: string) {
        return this.http.post(API_URL + '/auth', { password, username });
    }
    logout() {
        this.document.location.href = API_URL + '/auth/logout';
    }
    register(username: string, password: string) {
        return this.http.post(API_URL + '/auth/reg', { username, password });
    }

    updateUserVkId(userVkId: string) {
        return this.http.post(API_URL + '/auth/update-vk-id', { userVkId });
    }
}
