import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { BooksService } from './books.service';
import { EntitiesModule } from '../../entities/entities.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Http, HttpModule } from '@angular/http';
@NgModule({
  imports: [CommonModule, EntitiesModule, NgbModule, HttpModule],
  exports: [BooksComponent],
  declarations: [BooksComponent],
  providers: [BooksService],
})
export class BooksModule {}
