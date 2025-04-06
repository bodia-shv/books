import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'

import books from '../data/books.data'
import { IBook } from '../models/books.model'

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: IBook[] = [...books];
  private booksSubject = new BehaviorSubject<IBook[]>(this.books); 
  public books$: Observable<IBook[]> = this.booksSubject.asObservable(); 

  getBooks(): Observable<IBook[]> {
    return of(this.books);
  }

  addBook(book: IBook): void {
    const newBook = { ...book, id: this.generateId() };
    this.books = [...this.books, newBook];
    this.booksSubject.next(this.books);
  }

  updateBook(book: IBook): void {
    this.books = this.books.map(b => b.id === book.id ? { ...book } : b);
    this.booksSubject.next(this.books);
  }

  deleteBook(id: number): Observable<number> {
    this.books = this.books.filter(b => b.id !== id);
    this.booksSubject.next(this.books);
    return of(id);
  }

  private generateId(): number {
    return this.books.length > 0 ? Math.max(...this.books.map(book => book.id)) + 1 : 1;
  }
}