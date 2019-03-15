import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BooksModule } from './views/books/books.module';
import { VkAuthComponent } from './views/vk-auth/vk-auth.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, VkAuthComponent],
    imports: [BrowserModule, NgbModule.forRoot(), BrowserAnimationsModule, BooksModule],
    providers: [],
})
export class AppModule {}
