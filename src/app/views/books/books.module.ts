import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './book-view/books.component';
import { BooksService } from './books.service';
import { EntitiesModule } from '../../entities/entities.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Http, HttpModule } from '@angular/http';
import { BookFormComponent } from './book-form/book-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    matFormFieldAnimations,
    MatButtonModule,
    MatGridListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatDrawer,
    MatDrawerContainer,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
} from '@angular/material';
import { BooksTableComponent } from './books-table/books-table.component';
import { AuthenticationService } from '../../services/authService';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { RegFormComponent } from './reg-form/reg-form.component';
import { HeaderComponent } from './header/header.component';
import { HeaderService } from './header/header.service';
import { BookViewComponent } from './book-single-form/book-single-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { BooksMainComponent } from './books.component';
import { PDFJS } from 'pdfjs-dist';

const appRoutes: Routes = [
    { path: '', component: BooksComponent },
    { path: ':name', component: BookViewComponent },
    { path: '**', component: NotFoundComponent },
];
@NgModule({
    declarations: [
        BooksComponent,
        BookFormComponent,
        AuthFormComponent,
        BooksTableComponent,
        RegFormComponent,
        HeaderComponent,
        BookViewComponent,
        NotFoundComponent,
        BooksMainComponent,
    ],
    exports: [BooksMainComponent],
    imports: [
        CommonModule,
        EntitiesModule,
        NgbModule,
        HttpModule,
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
        RouterModule.forRoot(appRoutes),
    ],
    providers: [BooksService, AuthenticationService, HeaderService],
})
export class BooksModule {}
