import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPageContainerComponent } from './books-page-container/books-page-container.component';
import { BooksService } from './books.service';
import { EntitiesModule } from '../../entities/entities.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookFormComponent } from './book-form/book-form.component';
import { FormsModule } from '@angular/forms';
import {
    MatTableModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    MatTabGroup,
    MatTab,
    MatTabsModule,
} from '@angular/material';
import { BooksTableComponent } from './books-table/books-table.component';
import { AuthenticationService } from '../../services/authService';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { HeaderComponent } from './header/header.component';
import { SingleBookFormComponent } from './single-book-form/single-book-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { BooksMainComponent } from './books.component';
import { VkAuthComponent } from '../vk-auth/vk-auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '../../services/http-interceptor';
import { VkWidgetComponent } from './vk-widget/vk-widget.component';

const appRoutes: Routes = [
    { path: '', component: BooksPageContainerComponent },
    { path: 'auth-vk', component: VkAuthComponent },
    { path: ':name', component: SingleBookFormComponent },
    { path: '**', component: NotFoundComponent },
];
@NgModule({
    declarations: [
        BooksPageContainerComponent,
        BookFormComponent,
        AuthFormComponent,
        BooksTableComponent,
        HeaderComponent,
        SingleBookFormComponent,
        NotFoundComponent,
        BooksMainComponent,
        VkWidgetComponent,
    ],
    exports: [BooksMainComponent],
    imports: [
        CommonModule,
        EntitiesModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
        MatTableModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatSidenavModule,
        MatCardModule,
        MatDividerModule,
        MatTabsModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [
        BooksService,
        AuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
    ],
})
export class BooksModule {}
