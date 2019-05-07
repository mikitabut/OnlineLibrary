import { Action } from '@ngrx/store';

export const SHOW_SPINNER = '[Ui] Show spinner';
export const HIDE_SPINNER = '[Ui] Hide spinner';

export class ShowSpinner implements Action {
    readonly type = SHOW_SPINNER;

    constructor(public payload: null) {}
}
export class HideSpinner implements Action {
    readonly type = HIDE_SPINNER;

    constructor(public payload: null) {}
}

export type UiActions = ShowSpinner | HideSpinner;
