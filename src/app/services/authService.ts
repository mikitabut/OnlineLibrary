import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
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

    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post(API_URL + '/auth', { password, username });
    }
    register(username: string, password: string) {
        return this.http.post(API_URL + '/auth/reg', { username, password });
    }

    // TODO: token use
    updateUserVkId(userVkId: string, username: string) {
        debugger;
        return this.http.post(API_URL + '/auth/update-vk-id', { username, userVkId });
    }
}
