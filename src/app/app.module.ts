import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';

import { BooksModule } from './views/books/books.module';
import { VkAuthComponent } from './views/vk-auth/vk-auth.component';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { BookEffects } from './effects';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, VkAuthComponent],
    imports: [
        BrowserModule,
        NgbModule,
        BrowserAnimationsModule,
        BooksModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot([...BookEffects]),
    ],
    providers: [],
})
export class AppModule {}
