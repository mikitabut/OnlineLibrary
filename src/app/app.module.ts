import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BooksModule } from './views/books/books.module';
import { RSAService } from './services/RSAService';
import { SimpleNumberService } from './services/SimpleNumberGenerator';
import { CipherService } from './views/rsaTest/services/cipherService';
import { CipherComponent } from './views/rsaTest/CipherComponent/cipher.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, CipherComponent],
    imports: [BrowserModule, NgbModule.forRoot(), BrowserAnimationsModule, BooksModule],
    providers: [RSAService, SimpleNumberService, CipherService],
})
export class AppModule {}
