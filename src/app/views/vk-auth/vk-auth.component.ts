import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authService';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-vk-auth',
    templateUrl: './vk-auth.component.html',
    styleUrls: ['./vk-auth.component.css'],
})
export class VkAuthComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthenticationService,
        @Inject(DOCUMENT) private doc,
    ) {
        const snapshot = activatedRoute.snapshot;
        if (snapshot.queryParams.uid) {
            this.authService.updateUserVkId(snapshot.queryParams.uid).subscribe(success => {
                if (success) {
                    this.doc.location.href = '/';
                }
                return success;
            });
        }
    }

    ngOnInit() {}
}
