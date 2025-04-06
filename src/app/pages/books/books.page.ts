import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BookListComponent } from '../../components/books/books-list/books-list.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [BookListComponent],
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class BooksPageComponent {}