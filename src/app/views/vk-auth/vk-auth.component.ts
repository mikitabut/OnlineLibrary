import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as UserActions from '../../actions/user.actions';

@Component({
    selector: 'app-vk-auth',
    template: '',
})
export class VkAuthComponent {
    constructor(private activatedRoute: ActivatedRoute, private store: Store<any>) {
        const snapshot = this.activatedRoute.snapshot;
        if (snapshot.queryParams.uid) {
            this.store.dispatch(new UserActions.UpdateUserVkId(snapshot.queryParams.uid));
        }
    }
}
