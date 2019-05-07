import { Action } from '@ngrx/store';

export enum Actions {
    ShowNotification = '[Notification] Show notification',
}

export class ShowNotification implements Action {
    readonly type = Actions.ShowNotification;

    constructor(public payload: string) {}
}

export type BooksActions = ShowNotification;
