import { Action } from '@ngrx/store';

export const LOGIN = '[User] Login';
export const REGISTER = '[User] Register';
export const UPDATE_USER_VK_ID = '[User] Update user vk id';
export const LOGOUT = '[User] Logout';
export const SET_USER_DATA = '[User] Set User Data';

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: { username: string; password: string }) {}
}

export class Register implements Action {
    readonly type = REGISTER;

    constructor(public payload: { username: string; password: string }) {}
}

export class UpdateUserVkId implements Action {
    readonly type = UPDATE_USER_VK_ID;

    constructor(public payload: string) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;

    constructor(public payload: null) {}
}

export class SetUserData implements Action {
    readonly type = SET_USER_DATA;

    constructor(public payload: { username: string; token: string; userVkId: string }) {}
}

export type Actions = Login | SetUserData | Logout;
