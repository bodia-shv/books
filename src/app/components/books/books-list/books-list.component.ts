import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { EBooksEvent } from '../../../models/books.enum'
import { IBook } from '../../../models/books.model';
import { BookService } from '../../../services/books.service';
import { fadeOut } from '../../../shared/animations/template.animations'
import { BOOK_MODAL_W, CONFIRM_MODAL_W } from '../../../shared/const/constants'
import { ConfirmDialogComponent } from '../../../shared/modals/confirm-dialog/confirm-dialog.component'
import { AddEditBookComponent } from '../add-edit-book/add-edit-book.component';


@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeOut]
})
export class BookListComponent implements OnInit {

  private books = signal<IBook[]>([]);
  public searchString = signal<string>('');
  public isEmpty = signal<boolean>(false);
  public filteredBooks = computed(() => {
    const search = this.searchString().toLowerCase();
    return this.books().filter(book =>
      book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search)
    );
  });
  public readonly displayedColumns: string[] = ['cover', 'title', 'author', 'year', 'actions'];
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly bookService: BookService,
    private readonly dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  private getBooks(): void {
    this.bookService.books$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(books => {
      this.books.set(books);
      this.isEmpty.set(books.length === 0);
      this.cdr.markForCheck();
    })
  }

  public openAddBookDialog(): void {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      width: BOOK_MODAL_W,
      data: {
        book: null,
        viewOnly: false
      },
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          this.addBook(result);
        }
    });
  }

  private addBook(book: IBook): void {
    this.bookService.addBook(book);
  }

  public openEditBookDialog(book: IBook, e?: Event): void {
    e?.stopImmediatePropagation();
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      width: BOOK_MODAL_W,
      data: {
        book,
        viewOnly: false
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBook(result);
      }
    });
  }

  private updateBook(book: IBook): void {
    this.bookService.updateBook(book);
  }

  public openBookDetailsDialog(book: IBook): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = BOOK_MODAL_W;
    dialogConfig.data = { book, viewOnly: true };

    const dialogRef = this.dialog.open(AddEditBookComponent, dialogConfig);

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      if (result === EBooksEvent.DELETE) {
        this.deleteBook(book.id);
      } else if (result) {
        this.updateBook(result);
      }
    });
  }

  public deleteBook(id: number, e?: Event): void { 
    e?.stopImmediatePropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: CONFIRM_MODAL_W,
      data: { title: 'Confirm Deletion', content: 'Are you sure you want to delete this book?' }
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      if (result) {
        this.bookService.deleteBook(id);
        this.getBooks();
      }
    });
  }

  public trackByBookId(index: number, book: IBook): number {
    return book.id;
  }
}