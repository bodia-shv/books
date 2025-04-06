import { IBook } from "../models/books.model"

const books: IBook[] = [
  { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', year: 1954, description: 'A fantasy epic.', coverImageUrl: '' },
  { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, description: 'A classic romance novel.', coverImageUrl: '' },
  { id: 3, title: '1984', author: 'George Orwell', year: 1949, description: 'A dystopian novel.', coverImageUrl: '' },
  { id: 4, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, description: 'A novel about the American Dream.', coverImageUrl: '' },
  { id: 5, title: 'My Grandmother Asked Me to Tell You She is Sorry.', author: 'Loremipsum-Dolores Septemberman Junior Forest', year: 1960, description: 'A novel about racial injustice.', coverImageUrl: '' },
  { id: 6, title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, description: 'A children\'s fantasy novel.', coverImageUrl: 'https://img.freepik.com/premium-vector/isolated-fantasy-mystery-hobbit-house-vector_951778-48304.jpg?w=1380' },
  { id: 7, title: 'Little Women', author: 'Louisa May Alcott', year: 1868, description: 'A coming-of-age novel.', coverImageUrl: 'https://images.unsplash.com/photo-1741006727915-d25215fdaf04' },
  { id: 8, title: 'Animal Farm', author: 'George Orwell', year: 1945, description: 'An allegorical novella.', coverImageUrl: '' },
  { id: 9, title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951, description: 'A novel about adolescent alienation.', coverImageUrl: '' },
  { id: 10, title: 'Jane Eyre', author: 'Charlotte Brontë', year: 1847, description: 'A gothic romance novel.', coverImageUrl: '' },
];

export default books;