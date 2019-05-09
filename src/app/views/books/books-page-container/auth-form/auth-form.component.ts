import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as NotificationActions from '../../../../actions/notification.actions';
import * as UserActions from '../../../../actions/user.actions';

@Component({
    selector: 'auth-form',
    styleUrls: ['./auth-form.component.css'],
    templateUrl: './auth-form.component.html',
})
export class AuthFormComponent {
    public usernameAuth: string;
    public passwordAuth: string;

    constructor(private store: Store<any>) {}

    onSubmitAuth(isAuth: boolean) {
        if (this.canSignIn()) {
            if (isAuth) {
                this.store.dispatch(
                    new UserActions.Login({
                        username: this.usernameAuth,
                        password: this.passwordAuth,
                    }),
                );
            } else {
                this.store.dispatch(
                    new UserActions.Register({
                        username: this.usernameAuth,
                        password: this.passwordAuth,
                    }),
                );
            }
        } else {
            this.store.dispatch(
                new NotificationActions.ShowNotification('You should set all fields!!!!--'),
            );
        }
    }

    canSignIn() {
        return !!this.usernameAuth && !!this.passwordAuth;
    }
}
