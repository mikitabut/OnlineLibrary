import { Component, OnInit } from '@angular/core';

declare var VK: any;

@Component({
    selector: 'app-vk-widget',
    template: `
        <div class="vk-container">
            <div id="vk_auth" class="vk-content"></div>
        </div>
    `,
    styleUrls: ['./vk-widget.component.scss'],
})
export class VkWidgetComponent implements OnInit {
    ngOnInit() {
        VK.init({ apiId: 6780881 });
        VK.Widgets.Auth('vk_auth', { authUrl: '/auth-vk/' });
    }
}
