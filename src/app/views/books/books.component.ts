import { Component } from '@angular/core';

@Component({
    selector: 'books',
    template: `<div>
                    <router-outlet></router-outlet>
               </div>`,
})
export class BooksMainComponent {}
