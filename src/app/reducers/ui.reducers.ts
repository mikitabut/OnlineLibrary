import { createSelector } from '@ngrx/store';

import * as uiActions from '../actions/ui.actions';
import * as fromRoot from './';

export const rootSelector = (state: State) => state;

export interface UiState {
    spinnerCount: number;
}

export interface State extends fromRoot.State {
    ui: UiState;
}

const initialState: UiState = {
    spinnerCount: 0,
};

export function reducer(state = initialState, { type }: uiActions.UiActions): UiState {
    switch (type) {
        case uiActions.SHOW_SPINNER:
            return { ...state, spinnerCount: state.spinnerCount + 1 };
        case uiActions.HIDE_SPINNER:
            return { ...state, spinnerCount: state.spinnerCount - 1 };
        default:
            return state;
    }
}

export const getUi = createSelector(
    rootSelector,
    (state: State) => state.ui,
);
export const getIsSpinnerVisible = createSelector(
    getUi,
    (state: UiState) => state.spinnerCount > 0,
);
